'use client';

import { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  Alert,
  Stack,
  Tooltip,
} from '@mui/material';
import { RestartAlt as RestartIcon, Info as InfoIcon, Link as LinkIcon, TrendingUp as TrendingUpIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

interface Props {
  data: {
    make: string;
    model: string;
    version?: string;
    year: number;
    mileage: number;
    condition: string;
    engineSize?: string;
    enginePower?: string;
    transmission?: string;
    fuel?: string;
    features: string[];
    country: string;
  };
  onBack: () => void;
  onRestart: () => void;
}

interface ValuationResponse {
  value: number;
  confidence: 'low' | 'medium' | 'high';
  range: {
    min: number;
    max: number;
  };
  explanation: string;
  source: string;
  factors: {
    mileageImpact: number;
    conditionImpact: number;
    marketDemand: number;
    featuresPremium: number;
  };
  marketTrends: string;
  comparableListings: {
    price: number;
    mileage: number;
    year: number;
    version?: string;
    location: string;
    description: string;
    condition?: string;
  }[];
}

export default function ValuationResult({ data, onBack, onRestart }: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [valuation, setValuation] = useState<ValuationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getValuation = async () => {
    try {
      setLoading(true);
      setProgress(0);
      setError(null);

      // Progress simulation
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prevProgress + 10;
        });
      }, 800);

      console.log('Sending valuation request for:', data);
      const response = await fetch('/api/valuation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('Received valuation result:', result);

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch valuation');
      }

      // Validate the response
      if (!result || typeof result.value !== 'number' || result.value <= 0) {
        console.error('Invalid valuation response:', result);
        throw new Error('Unable to determine a valid valuation amount');
      }

      setValuation(result);
      setError(null);
      clearInterval(timer);
      setProgress(100);
    } catch (err: any) {
      console.error('Valuation error:', err);
      setError(err.message || 'Unable to fetch valuation. Please try again later.');
      setValuation(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    
    if (mounted) {
      getValuation();
    }

    return () => {
      mounted = false;
    };
  }, [data]);

  const getTranslationKey = (key: string): string => {
    return key.toLowerCase();
  };

  const formatMarketTrends = (trends: string) => {
    return t('marketTrendTemplate')
      .replace('{model}', `${data.make} ${data.model}`)
      .replace('{category}', data.make === 'Ferrari' ? 'exotic' : 'luxury')
      .replace('{make}', data.make);
  };

  const formatListingDescription = (listing: {
    price: number;
    mileage: number;
    year: number;
    version?: string;
    location: string;
    description: string;
    condition?: string;
  }) => {
    const mileageComparison = 
      listing.mileage < data.mileage ? t('lowerMileageDesc') :
      listing.mileage > data.mileage ? t('higherMileageDesc') :
      t('similarMileageDesc');

    return t('listingDescriptionTemplate')
      .replace('{year}', listing.year.toString())
      .replace('{mileage}', listing.mileage.toLocaleString())
      .replace('{condition}', t(getTranslationKey(listing.condition || 'good')))
      .replace('{features}', mileageComparison);
  };

  const formatValuationExplanation = (explanation: string) => {
    const features = data.features.map(f => t(getTranslationKey(f))).join(', ');
    
    return t('valuationExplanationTemplate')
      .replace('{make}', data.make)
      .replace('{model}', data.model)
      .replace('{year}', data.year.toString())
      .replace('{mileage}', data.mileage.toLocaleString())
      .replace('{condition}', t(getTranslationKey(data.condition)))
      .replace('{version}', data.version || data.model)
      .replace('{features}', features);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <CircularProgress variant="determinate" value={progress} size={60} />
        <Typography variant="h6" color="primary">
          {t('calculatingValuation')}
        </Typography>
        <Typography color="text.secondary">
          {t('analyzingMarketData').replace('{year}', data.year.toString())
            .replace('{make}', data.make)
            .replace('{model}', data.model + (data.version ? ` ${data.version}` : ''))}
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
          <br />
          <small>
            {t('errorTryAgainMessage')}
          </small>
        </Alert>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button onClick={onBack} variant="outlined">
            {t('back')}
          </Button>
          <Button 
            onClick={() => {
              setLoading(true);
              setProgress(0);
              setError(null);
              getValuation();
            }} 
            variant="contained" 
            color="primary"
          >
            {t('tryAgain')}
          </Button>
        </Stack>
      </Box>
    );
  }

  if (!valuation) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {t('errorNoData')}
          <br />
          <small>{t('errorMissingData')}</small>
        </Alert>
        <Button onClick={onBack} variant="outlined">
          {t('back')}
        </Button>
      </Box>
    );
  }

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return 'success.main';
      case 'medium':
        return 'warning.main';
      case 'low':
        return 'error.main';
      default:
        return 'text.secondary';
    }
  };

  const getConfidenceText = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return t('confidenceHigh');
      case 'medium':
        return t('confidenceMedium');
      case 'low':
        return t('confidenceLow');
      default:
        return confidence.toUpperCase();
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
        <Stack spacing={3}>
          {/* Vehicle Details Summary */}
          <Box>
            <Typography variant="h5" gutterBottom>
              {data.year} {data.make} {data.model} {data.version && `(${data.version})`}
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <Typography color="text.secondary">
                {data.mileage.toLocaleString()} {t('kilometers')}
              </Typography>
              <Typography color="text.secondary">
                {t(getTranslationKey(data.condition))} {t('condition')}
              </Typography>
              {data.version && (
                <Typography color="text.secondary">
                  {data.version}
                </Typography>
              )}
              {data.engineSize && (
                <Typography color="text.secondary">
                  {data.engineSize} {data.enginePower && `(${data.enginePower})`}
                </Typography>
              )}
              {data.transmission && (
                <Typography color="text.secondary">
                  {t(getTranslationKey(data.transmission))}
                </Typography>
              )}
              {data.fuel && (
                <Typography color="text.secondary">
                  {t(getTranslationKey(data.fuel))}
                </Typography>
              )}
            </Stack>
          </Box>

          {/* Valuation Result */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" component="h2" gutterBottom>
              {formatCurrency(valuation.value)}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('confidenceLevel')}: {getConfidenceText(valuation.confidence)}
            </Typography>
          </Box>

          {/* Market Trends */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TrendingUpIcon />
              {t('marketTrendsTitle')}
            </Typography>
            <Typography variant="body1">
              {formatMarketTrends(valuation.marketTrends)}
            </Typography>
          </Box>

          {/* Comparable Listings */}
          {valuation.comparableListings && valuation.comparableListings.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                {t('comparableVehiclesTitle')}
              </Typography>
              <List>
                {valuation.comparableListings.map((listing, index) => (
                  <ListItem key={index} sx={{ 
                    bgcolor: 'background.paper', 
                    mb: 1, 
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider'
                  }}>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          €{formatCurrency(listing.price)} - {listing.year}
                        </Typography>
                      }
                      secondary={
                        <Box component="span">
                          <Typography 
                            component="span" 
                            variant="body2" 
                            color="text.secondary"
                            display="block"
                          >
                            {listing.mileage.toLocaleString()} {t('kilometers')} • {listing.location}
                            {listing.version && ` • ${listing.version}`}
                          </Typography>
                          <Typography 
                            component="span" 
                            variant="body2"
                            display="block"
                            sx={{ mt: 0.5 }}
                          >
                            {formatListingDescription(listing)}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {/* Valuation Factors */}
          <Box>
            <Typography variant="h6" gutterBottom>
              {t('valueFactorsTitle')}
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={
                    <Typography variant="body1">
                      {t('marketDemandFactor')}
                    </Typography>
                  }
                  secondary={
                    <Typography component="span" variant="body2" color="text.secondary">
                      {t('impactOnValue')}: {valuation.factors.marketDemand > 0 ? '+' : ''}{valuation.factors.marketDemand}%
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <Typography variant="body1">
                      {t('mileageComparisonFactor')}
                    </Typography>
                  }
                  secondary={
                    <Typography component="span" variant="body2" color="text.secondary">
                      {t('impactOnValue')}: {valuation.factors.mileageImpact > 0 ? '+' : ''}{valuation.factors.mileageImpact}%
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <Typography variant="body1">
                      {t('vehicleConditionFactor')}
                    </Typography>
                  }
                  secondary={
                    <Typography component="span" variant="body2" color="text.secondary">
                      {t('impactOnValue')}: {valuation.factors.conditionImpact > 0 ? '+' : ''}{valuation.factors.conditionImpact}%
                    </Typography>
                  }
                />
              </ListItem>
              {valuation.factors.featuresPremium !== 0 && (
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        {t('equipmentFeaturesFactor')}
                      </Typography>
                    }
                    secondary={
                      <Typography component="span" variant="body2" color="text.secondary">
                        {t('impactOnValue')}: {valuation.factors.featuresPremium > 0 ? '+' : ''}{valuation.factors.featuresPremium}%
                      </Typography>
                    }
                  />
                </ListItem>
              )}
            </List>
          </Box>

          {/* Explanation */}
          <Box>
            <Typography variant="body1">
              {formatValuationExplanation(valuation.explanation)}
            </Typography>
          </Box>

          {/* Data Sources */}
          <Box>
            <Typography variant="body2" color="text.secondary">
              {t('dataSource')}: {valuation.source}
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button onClick={onBack} variant="outlined">
          {t('back')}
        </Button>
        <Button
          onClick={onRestart}
          variant="contained"
          startIcon={<RestartIcon />}
        >
          {t('newValuation')}
        </Button>
      </Stack>
    </Box>
  );
} 