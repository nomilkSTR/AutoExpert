'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  Stack,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  FormHelperText,
  Tooltip,
  Chip,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import type { GridProps as MuiGridProps } from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { getAvailableEquipment } from '../data/vehicleEquipment';

// Helper function to format feature names for display
const formatFeatureName = (feature: string): string => {
  // Special cases
  if (feature === 'usbPort') return 'USB Port';
  if (feature === 'androidAutoCarPlay') return 'Android Auto & CarPlay';
  if (feature === 'abs') return 'ABS';
  if (feature === 'ac') return 'AC';

  // General case: convert camelCase to Title Case with spaces
  return feature
    // Insert a space before all capital letters
    .replace(/([A-Z])/g, ' $1')
    // Capitalize the first letter
    .replace(/^./, str => str.toUpperCase())
    // Trim any extra spaces
    .trim();
};

interface GridProps extends MuiGridProps {
  item?: boolean;
  container?: boolean;
  xs?: number | 'auto';
  sm?: number | 'auto';
  md?: number | 'auto';
  lg?: number | 'auto';
  xl?: number | 'auto';
}

interface VehicleFeaturesProps {
  onSubmit: (data: VehicleFeaturesFormData) => void;
  onBack: () => void;
  initialData: {
    make: string;
    model: string;
    year: number;
    features?: string[];
  };
}

interface VehicleFeaturesFormData {
  features: string[];
}

const conditions = [
  'excellent',
  'good',
  'fair',
  'poor'
];

const StyledGrid = styled(Grid)<GridProps>({});

export default function VehicleFeatures({ onSubmit, onBack, initialData }: VehicleFeaturesProps) {
  const { t } = useTranslation();
  
  // Debug initial data
  console.log('[VehicleFeatures] Initial data:', initialData);
  
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<VehicleFeaturesFormData>({
    defaultValues: {
      features: Array.isArray(initialData.features) ? initialData.features.filter(Boolean) : [],
    },
    mode: 'onChange'
  });

  // Get available equipment based on make, model, and year
  const { standard: standardFeatures, optional: optionalFeatures } = getAvailableEquipment(
    initialData.make,
    initialData.model,
    initialData.year
  );

  // Debug equipment data
  console.log('[VehicleFeatures] Available equipment:', { standardFeatures, optionalFeatures });

  // Ensure standard features are always included
  useEffect(() => {
    const currentFeatures = watch('features');
    const allFeatures = [...new Set([...currentFeatures, ...standardFeatures])];
    setValue('features', allFeatures);
  }, [standardFeatures, setValue, watch]);

  const onFormSubmit = (data: VehicleFeaturesFormData) => {
    // All required fields are present, prepare the submission data
    const formData = {
      features: [...new Set([...data.features || [], ...standardFeatures])], // Ensure standard features are included
    };

    console.log('[VehicleFeatures] Submitting form data:', formData);
    onSubmit(formData);
  };

  // Add useEffect to watch form changes with debounce
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const subscription = watch((value) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      
      timeout = setTimeout(() => {
        const formData = value as VehicleFeaturesFormData;
        if (formData.features?.length) {
          onFormSubmit(formData);
        }
      }, 500);
    });

    return () => {
      subscription.unsubscribe();
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [watch, onFormSubmit]);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Stack spacing={3}>
        {/* Optional Features */}
        <Box>
          <Typography variant="h6" gutterBottom>
            {t('optionalFeatures')}
          </Typography>
          <FormGroup>
            <StyledGrid container spacing={2}>
              {optionalFeatures.map((feature) => (
                <StyledGrid key={feature} item xs={12} sm={4}>
                  <Box 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      p: 1,
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: 1,
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                      }
                    }}
                  >
                    <Controller
                      name="features"
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value.includes(feature)}
                              onChange={(e) => {
                                const updatedFeatures = e.target.checked
                                  ? [...field.value, feature]
                                  : field.value.filter((f: string) => f !== feature);
                                field.onChange(updatedFeatures);
                              }}
                            />
                          }
                          label={formatFeatureName(feature)}
                          sx={{
                            width: '100%',
                            margin: 0,
                            '.MuiFormControlLabel-label': {
                              flex: 1,
                              ml: 1
                            }
                          }}
                        />
                      )}
                    />
                  </Box>
                </StyledGrid>
              ))}
            </StyledGrid>
          </FormGroup>
        </Box>
      </Stack>
    </form>
  );
} 