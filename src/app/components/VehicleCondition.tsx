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
    console.log('[VehicleCondition] Processing form data:', data);

    // Vérifier et formater la condition
    const condition = data.condition?.trim();
    if (!condition || !conditions.includes(condition)) {
      console.log('[VehicleCondition] Invalid condition:', condition);
      return;
    }

    const formData = {
      ...initialData,
      condition,
      additionalNotes: data.additionalNotes?.trim() || '',
    };

    console.log('[VehicleCondition] Submitting data:', formData);
    onSubmit(formData);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const subscription = watch((value, { name, type }) => {
      if (type === 'change') {
        if (timeout) {
          clearTimeout(timeout);
        }
        
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
          <FormHelperText>
            {errors.condition ? t('required') : t('selectCondition')}
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