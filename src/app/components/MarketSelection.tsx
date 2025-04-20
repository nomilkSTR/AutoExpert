'use client';

import { useForm, Controller } from 'react-hook-form';
import {
  Typography,
  Box,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Stack,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect, useCallback } from 'react';

interface MarketSelectionProps {
  onSubmit: (data: any) => void;
  initialData: any;
}

const countries = [
  'belgium',
  'france',
  'germany',
  'italy',
  'netherlands',
  'spain',
  'switzerland',
  'unitedKingdom'
];

export default function MarketSelection({ onSubmit, initialData }: MarketSelectionProps) {
  const { t } = useTranslation();
  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      country: initialData.country || '',
    },
    mode: 'onChange'
  });

  const onFormSubmit = useCallback((data: any) => {
    console.log('[MarketSelection] Received data:', data);
    console.log('[MarketSelection] Initial data:', initialData);

    // Only submit if we have both country and vehicle data from initialData
    if (!data.country) {
      console.log('[MarketSelection] Missing country');
      return;
    }

    if (!initialData || !initialData.make || !initialData.model || !initialData.year || 
        !initialData.mileage || !initialData.engineSize || !initialData.enginePower || 
        !initialData.transmission || !initialData.fuel) {
      console.log('[MarketSelection] Missing vehicle data in initialData:', initialData);
      return;
    }

    // Merge country with existing vehicle data
    const formData = {
      ...initialData,
      country: data.country,
    };

    console.log('[MarketSelection] Submitting complete data:', formData);
    onSubmit(formData);
  }, [initialData, onSubmit]);

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
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom align="center" color="primary" sx={{ mb: 4 }}>
          {t('registrationCountryStep')}
        </Typography>

        <Box component="form">
          <Stack spacing={4}>
            <Controller
              name="country"
              control={control}
              rules={{ required: t('required') }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.country}>
                  <InputLabel id="country-label">{t('registrationCountryStep')} *</InputLabel>
                  <Select
                    {...field}
                    labelId="country-label"
                    label={`${t('registrationCountryStep')} *`}
                    value={field.value || ''}
                  >
                    {countries.map((country) => (
                      <MenuItem key={country} value={country}>
                        {t(country)}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {errors.country ? String(errors.country.message) : t('selectCountryHelper')}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Stack>
        </Box>
      </Paper>

      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
        {t('marketAnalysis')}
      </Typography>
    </Box>
  );
} 