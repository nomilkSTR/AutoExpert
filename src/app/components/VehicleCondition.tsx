'use client';

import { useForm, Controller } from 'react-hook-form';
import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Stack,
  TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

interface VehicleConditionProps {
  onSubmit: (data: any) => void;
  initialData: any;
}

const conditions = [
  'excellent',
  'good',
  'fair',
  'poor'
];

export default function VehicleCondition({ onSubmit, initialData }: VehicleConditionProps) {
  const { t } = useTranslation();
  const { control, watch, formState: { errors } } = useForm({
    defaultValues: {
      condition: initialData.condition || '',
      additionalNotes: initialData.additionalNotes || '',
    },
    mode: 'onChange'
  });

  const onFormSubmit = (data: any) => {
    // Validate all required fields have non-empty values
    const requiredFields = {
      condition: data.condition,
    };

    // Check if any required field is missing or empty
    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([field]) => field);

    if (missingFields.length > 0) {
      console.log('[VehicleCondition] Missing required fields:', missingFields);
      return;
    }

    // All required fields are present, prepare the submission data
    const formData = {
      ...data,
      condition: data.condition,
      additionalNotes: data.additionalNotes || '',
    };

    console.log('[VehicleCondition] Submitting form data:', formData);
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
    <Box>
      <Stack spacing={3}>
        <FormControl 
          fullWidth 
          error={!!errors.condition}
          sx={{ 
            minWidth: { xs: '100%', sm: '50%' },
            margin: '20px 0'
          }}
        >
          <InputLabel id="condition-label">{t('vehicleConditionLabel')} *</InputLabel>
          <Controller
            name="condition"
            control={control}
            rules={{ required: t('required') }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="condition-label"
                label={`${t('vehicleConditionLabel')} *`}
              >
                {conditions.map((condition) => (
                  <MenuItem key={condition} value={condition}>
                    {t(condition)}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText error={!!errors.condition}>
            {errors.condition ? errors.condition.message : t('selectCondition')}
          </FormHelperText>
        </FormControl>

        <Controller
          name="additionalNotes"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              rows={4}
              label={t('additionalNotes')}
              placeholder={t('additionalNotesPlaceholder')}
            />
          )}
        />
      </Stack>
    </Box>
  );
} 