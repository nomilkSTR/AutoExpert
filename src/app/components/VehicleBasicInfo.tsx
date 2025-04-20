'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  Stack,
  Box,
  InputAdornment,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface VehicleBasicInfoProps {
  onSubmit: (data: any) => void;
  initialData: any;
}

// List of major car manufacturers
const carMakes = [
  'Acura', 'Alfa Romeo', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Bugatti',
  'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Citroën', 'Dodge', 'Ferrari',
  'Fiat', 'Ford', 'Genesis', 'GMC', 'Honda', 'Hyundai', 'Infiniti', 'Jaguar',
  'Jeep', 'Kia', 'Lamborghini', 'Land Rover', 'Lexus', 'Lincoln', 'Lotus',
  'Maserati', 'Mazda', 'McLaren', 'Mercedes-Benz', 'MINI', 'Mitsubishi',
  'Nissan', 'Opel', 'Peugeot', 'Porsche', 'Ram', 'Renault', 'Rolls-Royce',
  'Saab', 'Subaru', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo'
].sort();

const fuelTypes = [
  'petrol',
  'diesel',
  'hybrid',
  'electric',
  'pluginHybrid',
  'lpg',
  'cng',
  'hydrogen'
];

const transmissionTypes = [
  'manual',
  'automatic'
];

const engineSizes = [
  '1.0', '1.2', '1.3', '1.4', '1.5', '1.6', '1.8', '1.9',
  '2.0', '2.2', '2.3', '2.4', '2.5', '2.7', '2.8', '2.9',
  '3.0', '3.2', '3.3', '3.5', '3.6', '3.8',
  '4.0', '4.2', '4.4', '4.6', '4.8',
  '5.0', '5.2', '5.5', '5.7',
  '6.0', '6.2', '6.3', '6.4', '6.5',
  '7.0', '8.0', '8.4'
];

// This would ideally come from an API based on make/model/year selection
const mockEngineOptions = {
  'Audi': {
    'A8': [
      { id: '1', name: '3.0 TDI V6 (286 HP)', fuel: 'Diesel' },
      { id: '2', name: '4.2 TDI V8 (385 HP)', fuel: 'Diesel' },
      { id: '3', name: '3.0 TFSI V6 (340 HP)', fuel: 'Petrol' },
      { id: '4', name: '4.0 TFSI V8 (460 HP)', fuel: 'Petrol' },
      { id: '5', name: '6.3 W12 (500 HP)', fuel: 'Petrol' }
    ],
    // Add more models...
  },
  // Add more makes...
};

export default function VehicleBasicInfo({ onSubmit, initialData }: VehicleBasicInfoProps) {
  const { t } = useTranslation();
  const { control, register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      make: initialData.make || '',
      model: initialData.model || '',
      version: initialData.version || '',
      year: initialData.year || new Date().getFullYear(),
      mileage: initialData.mileage || 0,
      engineSize: initialData.engineSize || '',
      enginePower: initialData.enginePower || '',
      transmission: initialData.transmission || '',
      fuel: initialData.fuel || '',
    },
    mode: 'onChange'
  });

  const currentYear = new Date().getFullYear();
  const selectedFuel = watch('fuel');

  const onFormSubmit = (data: any) => {
    // Log the current form data for debugging
    console.log('[VehicleBasicInfo] Current form data:', data);

    // Validate all required fields have non-empty values
    const requiredFields = {
      make: data.make,
      model: data.model,
      year: data.year,
      mileage: data.mileage,
      engineSize: data.engineSize,
      enginePower: data.enginePower,
      transmission: data.transmission,
      fuel: data.fuel
    };

    // Check if any required field is missing or empty
    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([field]) => field);

    if (missingFields.length > 0) {
      console.log('[VehicleBasicInfo] Missing required fields:', missingFields);
      return;
    }

    // All required fields are present, prepare the submission data
    const formData = {
      ...data,
      make: data.make.trim?.() || data.make,
      model: data.model.trim?.() || data.model,
      year: Number(data.year),
      mileage: Number(data.mileage),
      engineSize: data.engineSize,
      enginePower: Number(data.enginePower),
      transmission: data.transmission,
      fuel: data.fuel,
    };

    console.log('[VehicleBasicInfo] Submitting form data:', formData);
    onSubmit(formData);
  };

  // Add useEffect to watch form changes with debounce
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const subscription = watch((value, { name, type }) => {
      if (type === 'change') {
        // Clear any existing timeout
        if (timeout) {
          clearTimeout(timeout);
        }
        
        // Wait for 500ms after the last change before submitting
        timeout = setTimeout(() => {
          onFormSubmit(value);
        }, 500);
      }
    });

    return () => {
      subscription.unsubscribe();
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [watch, onFormSubmit]);

  return (
    <Box component="form">
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Controller
            name="make"
            control={control}
            rules={{ required: t('required') }}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                fullWidth
                options={carMakes}
                value={value || null}
                onChange={(_, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={`${t('make')} *`}
                    error={!!errors.make}
                    helperText={errors.make?.message?.toString() || t('selectMake')}
                  />
                )}
                freeSolo
                autoSelect
              />
            )}
          />
          <TextField
            required
            fullWidth
            label={t('model')}
            {...register('model', { required: t('required') })}
            error={!!errors.model}
            helperText={errors.model?.message?.toString() || ' '}
          />
        </Stack>

        <TextField
          fullWidth
          label={t('version')}
          {...register('version')}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            required
            fullWidth
            label={t('year')}
            type="number"
            {...register('year', {
              required: t('required'),
              min: {
                value: 1900,
                message: t('invalidYear')
              },
              max: {
                value: currentYear,
                message: t('yearBeforeCurrent')
              }
            })}
            error={!!errors.year}
            helperText={errors.year?.message?.toString() || ' '}
          />
          <TextField
            required
            fullWidth
            label={t('mileage')}
            type="number"
            {...register('mileage', {
              required: t('required'),
              min: {
                value: 0,
                message: t('invalidMileage')
              },
              max: {
                value: 999999,
                message: t('mileageTooHigh')
              }
            })}
            InputProps={{
              endAdornment: <InputAdornment position="end">{t('distanceUnit')}</InputAdornment>,
            }}
            error={!!errors.mileage}
            helperText={errors.mileage?.message?.toString() || ' '}
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Controller
            name="fuel"
            control={control}
            rules={{ required: t('required') }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.fuel}>
                <InputLabel id="fuel-label">{`${t('fuel')} *`}</InputLabel>
                <Select
                  {...field}
                  labelId="fuel-label"
                  label={`${t('fuel')} *`}
                  value={field.value || ''}
                >
                  {fuelTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {t(type)}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.fuel ? String(errors.fuel.message) : t('selectFuel')}
                </FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="engineSize"
            control={control}
            rules={{ required: t('required') }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.engineSize}>
                <InputLabel id="engine-size-label">{`${t('engineSize')} (L) *`}</InputLabel>
                <Select
                  {...field}
                  labelId="engine-size-label"
                  label={`${t('engineSize')} (L) *`}
                  value={field.value || ''}
                >
                  {engineSizes.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}L
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText children={errors.engineSize ? t('required') : t('engineSizeHelper')} />
              </FormControl>
            )}
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            required
            fullWidth
            label={t('enginePower')}
            type="number"
            {...register('enginePower', {
              required: t('required'),
              min: {
                value: 1,
                message: t('powerPositive')
              }
            })}
            InputProps={{
              endAdornment: <InputAdornment position="end">HP</InputAdornment>,
            }}
            error={!!errors.enginePower}
            helperText={errors.enginePower?.message?.toString() || ' '}
          />

          <Controller
            name="transmission"
            control={control}
            rules={{ required: t('required') }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.transmission}>
                <InputLabel id="transmission-label">{`${t('transmission')} *`}</InputLabel>
                <Select
                  {...field}
                  labelId="transmission-label"
                  label={`${t('transmission')} *`}
                  value={field.value || ''}
                >
                  {transmissionTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {t(type)}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.transmission ? String(errors.transmission.message) : t('selectTransmission')}
                </FormHelperText>
              </FormControl>
            )}
          />
        </Stack>
      </Stack>
    </Box>
  );
} 