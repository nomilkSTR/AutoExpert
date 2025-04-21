'use client';

import { useForm, Controller } from 'react-hook-form';
import {
  Typography,
  Box,
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
  const { control, watch, formState: { errors } } = useForm({
    defaultValues: {
      country: initialData.country || '',
    },
    mode: 'onChange'
  });

  const onFormSubmit = useCallback((data: any) => {
    console.log('[MarketSelection] Processing form data:', data);
    
    // S'assurer que le pays est une chaîne non vide
    const country = data.country?.trim();
    if (!country) {
      console.log('[MarketSelection] No country selected');
      return;
    }

    const formData = {
      ...initialData,
      country: country,
    };

    console.log('[MarketSelection] Submitting data:', formData);
    onSubmit(formData);
  }, [initialData, onSubmit]);

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