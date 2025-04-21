'use client';

import React from 'react';
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
import { FormData } from '../types/vehicle';

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

interface Props {
  data: FormData;
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
      setError(null);
      setValuation(null);
      setProgress(0);

      // Points de ralentissement aléatoires pour que l'animation varie à chaque fois
      const slowdownPoint1 = Math.floor(Math.random() * 30) + 25; // Entre 25% et 55%
      const slowdownPoint2 = Math.floor(Math.random() * 20) + 65; // Entre 65% et 85%
      const maxProgress = Math.floor(Math.random() * 5) + 93; // Maximum entre 93% et 98%

      // Animation fluide de progression
      let lastTimestamp = Date.now();
      let animationFrameId: number | null = null;
      
      const updateProgress = () => {
        const now = Date.now();
        const elapsed = now - lastTimestamp;
        lastTimestamp = now;
        
        setProgress(prev => {
          // Calcul de l'incrément basé sur la position actuelle
          let speed = 0.3; // Vitesse normale
          
          // Ralentir près des points de ralentissement
          if (Math.abs(prev - slowdownPoint1) < 10) {
            speed = 0.05;
          } else if (Math.abs(prev - slowdownPoint2) < 10) {
            speed = 0.03;
          }
          
          // Plus on approche de maxProgress, plus on ralentit
          if (prev > maxProgress - 10) {
            speed = 0.02;
          }
          
          // Incrément progressif basé sur le temps écoulé et la vitesse
          const increment = speed * (elapsed / 30);
          const newProgress = prev + increment;
          
          // Ne pas dépasser la limite maximale pendant le chargement
          return newProgress < maxProgress ? newProgress : maxProgress;
        });
        
        // Continuer l'animation tant que nécessaire
        animationFrameId = requestAnimationFrame(updateProgress);
      };
      
      // Démarrer l'animation
      animationFrameId = requestAnimationFrame(updateProgress);

      try {
        const response = await fetch('/api/valuation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch valuation');
        }

        // Finaliser progressivement à 100%
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
        
        let finishFrameId: number | null = null;
        
        const finishAnimation = () => {
          setProgress(prev => {
            const newProgress = prev + 0.5;
            if (newProgress >= 100) {
              if (finishFrameId) {
                cancelAnimationFrame(finishFrameId);
                finishFrameId = null;
              }
              return 100;
            }
            return newProgress;
          });
          
          finishFrameId = requestAnimationFrame(finishAnimation);
        };
        
        finishFrameId = requestAnimationFrame(finishAnimation);

        // Validate the response structure
        if (!result || typeof result.value !== 'number' || result.value <= 0) {
          console.error('Invalid valuation response:', result);
          throw new Error('The valuation service returned an invalid response. Please try again later.');
        }

        // Ensure all required fields are present with proper types
        const validatedResult: ValuationResponse = {
          value: result.value,
          confidence: result.confidence || 'low',
          range: result.range || { min: result.value * 0.9, max: result.value * 1.1 },
          explanation: result.explanation || 'No detailed explanation available',
          source: result.source || 'Unknown source',
          factors: {
            mileageImpact: typeof result.factors?.mileageImpact === 'number' ? result.factors.mileageImpact : 0,
            conditionImpact: typeof result.factors?.conditionImpact === 'number' ? result.factors.conditionImpact : 0,
            marketDemand: typeof result.factors?.marketDemand === 'number' ? result.factors.marketDemand : 0,
            featuresPremium: typeof result.factors?.featuresPremium === 'number' ? result.factors.featuresPremium : 0
          },
          marketTrends: result.marketTrends || '',
          comparableListings: Array.isArray(result.comparableListings) ? result.comparableListings : []
        };

        setValuation(validatedResult);
        setError(null);
      } catch (err: any) {
        // Arrêter l'animation en cas d'erreur
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        throw err;
      }
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
    if (!trends || trends.trim() === '') {
      return '';
    }
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
    return '';
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '300px', 
        gap: 4,
        py: 8 
      }}>
        <Box sx={{ 
          position: 'relative', 
          width: '220px', 
          height: '220px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Anneau circulaire de base */}
          <Box sx={{ 
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            boxSizing: 'border-box',
            background: 'rgba(30, 30, 32, 0.3)',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
          }}/>
          
          {/* Progressbar circulaire */}
          <Box sx={{ 
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: `conic-gradient(#0a84ff ${progress}%, transparent 0%)`,
            transform: 'rotate(-90deg)',
            boxShadow: '0 0 15px rgba(10, 132, 255, 0.3)',
            '&::after': {
              content: '""',
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'rgba(10, 132, 255, 0.1)',
              filter: 'blur(10px)',
              opacity: 0.7,
              transform: 'scale(1.05)'
            }
          }}/>
          
          {/* Point lumineux qui suit la progression */}
          <Box sx={{ 
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            transform: `rotate(${progress * 3.6 - 90}deg)`,
            transformOrigin: 'center',
            pointerEvents: 'none'
          }}>
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: '50%',
              width: '12px',
              height: '12px',
              background: '#ffffff',
              borderRadius: '50%',
              transform: 'translateX(-50%)',
              boxShadow: '0 0 10px 2px #0a84ff',
              filter: 'blur(1px)'
            }}/>
          </Box>
          
          {/* Cercle central */}
          <Box sx={{
            position: 'absolute',
            top: '15px',
            left: '15px',
            right: '15px',
            bottom: '15px',
            borderRadius: '50%',
            background: 'rgba(28, 28, 30, 0.95)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: 2,
            boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.3)'
          }}>
            <Typography 
              variant="h3" 
              color="#0a84ff" 
              fontWeight="bold" 
              align="center"
              sx={{ 
                fontSize: '3rem',
                textShadow: '0 0 10px rgba(10, 132, 255, 0.5)'
              }}
            >
              {`${Math.round(progress)}%`}
            </Typography>
            
            <Typography 
              variant="caption" 
              color="white" 
              sx={{ 
                opacity: 0.8, 
                mt: 1,
                textAlign: 'center'
              }}
            >
              {t('calculatingValuation')}
            </Typography>
          </Box>
        </Box>
        
        {/* Description et marque */}
        <Box sx={{ 
          maxWidth: '400px', 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Typography 
            color="rgba(255, 255, 255, 0.7)" 
            variant="body2"
            mb={2}
          >
            {t('analyzingMarketData')
              .replace('{year}', data.year.toString())
              .replace('{make}', data.make)
              .replace('{model}', data.model + (data.version ? ` ${data.version}` : ''))}
          </Typography>
          
          <Typography
            color="#0a84ff"
            variant="caption"
            fontWeight="medium"
            sx={{
              opacity: 0.8,
              fontSize: '0.8rem',
              letterSpacing: '0.5px'
            }}
          >
            Auto<Box component="span" sx={{ opacity: 0.85 }}>Expert</Box>
          </Typography>
        </Box>
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
      <Paper elevation={3} sx={{ 
        p: { xs: 2, sm: 4 }, 
        mb: 3,
        borderRadius: 3,
        boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
        bgcolor: 'rgba(28, 28, 30, 0.95)',
        backdropFilter: 'blur(10px)',
        color: '#ffffff',
        position: 'relative'
      }}>
        <Box sx={{ 
          position: 'absolute', 
          top: 16, 
          right: 16, 
          display: 'flex', 
          alignItems: 'center',
          opacity: 0.8
        }}>
          <Typography variant="subtitle2" sx={{ 
            fontWeight: 'bold', 
            letterSpacing: 1,
            color: '#0a84ff',
            mr: 1
          }}>
            Auto<Box component="span" sx={{ opacity: 0.85 }}>Expert</Box>
          </Typography>
        </Box>
        
        <Stack spacing={3}>
          {/* Vehicle Details Summary */}
          <Box>
            <Typography variant="h5" gutterBottom color="white">
              {data.year} {data.make} {data.model} {data.version && `(${data.version})`}
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <Typography color="rgba(255, 255, 255, 0.7)">
                {data.mileage.toLocaleString()} {t('kilometers')}
              </Typography>
              <Typography color="rgba(255, 255, 255, 0.7)">
                {t(getTranslationKey(data.condition))} {t('condition')}
              </Typography>
              {data.version && (
                <Typography color="rgba(255, 255, 255, 0.7)">
                  {data.version}
                </Typography>
              )}
              {data.engineSize && (
                <Typography color="rgba(255, 255, 255, 0.7)">
                  {data.engineSize} {data.enginePower && `(${data.enginePower})`}
                </Typography>
              )}
              {data.transmission && (
                <Typography color="rgba(255, 255, 255, 0.7)">
                  {t(getTranslationKey(data.transmission))}
                </Typography>
              )}
              {data.fuel && (
                <Typography color="rgba(255, 255, 255, 0.7)">
                  {t(getTranslationKey(data.fuel))}
                </Typography>
              )}
            </Stack>
          </Box>

          {/* Valuation Result */}
          <Box sx={{ 
            textAlign: 'center', 
            mb: 4,
            py: 4,
            px: 2,
            borderRadius: 2,
            background: 'linear-gradient(145deg, #000000 0%, #111111 100%)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
            border: '1px solid rgba(80, 80, 85, 0.3)',
            position: 'relative'
          }}>
            <Typography 
              variant="overline" 
              color="#0a84ff" 
              fontWeight="bold"
              letterSpacing={1.5}
              sx={{ display: 'block', mb: 1 }}
            >
              {t('estimatedValue')} • AutoExpert
            </Typography>
            <Typography 
              variant="h2" 
              component="h2" 
              gutterBottom 
              fontWeight="700"
              color="white"
              sx={{ 
                fontSize: { xs: '2.5rem', sm: '3.5rem' },
                letterSpacing: '-0.5px'
              }}
            >
              {formatCurrency(valuation.value)}
            </Typography>
            <Box sx={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              px: 2, 
              py: 0.75, 
              borderRadius: 10,
              bgcolor: 'rgba(10, 132, 255, 0.2)',
              color: '#0a84ff'
            }}>
              <Typography variant="body2" fontWeight="medium">
                {t('confidenceLevel')}: {getConfidenceText(valuation.confidence)}
              </Typography>
            </Box>
            
            <Typography variant="body2" color="rgba(255, 255, 255, 0.6)" sx={{ mt: 2 }}>
              {t('estimatedRange')}: {formatCurrency(valuation.range.min)} - {formatCurrency(valuation.range.max)}
            </Typography>
          </Box>

          {/* Comparable Listings */}
          {valuation.comparableListings && valuation.comparableListings.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="600" color="white" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {t('comparableVehiclesTitle')}
              </Typography>
              <List sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(auto-fill, minmax(250px, 1fr))' },
                gap: 2,
                pt: 1 
              }}>
                {valuation.comparableListings.map((listing, index) => (
                  <ListItem 
                    key={index} 
                    sx={{ 
                      p: 0,
                      display: 'block',
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        bgcolor: 'rgba(44, 44, 46, 0.8)', 
                        border: '1px solid',
                        borderColor: 'rgba(80, 80, 85, 0.3)',
                        borderRadius: 2,
                        transition: 'all 0.2s',
                        backdropFilter: 'blur(5px)',
                        '&:hover': {
                          boxShadow: '0 5px 15px rgba(0,0,0,0.15)',
                          borderColor: 'rgba(10, 132, 255, 0.5)',
                          bgcolor: 'rgba(44, 44, 46, 0.95)',
                        }
                      }}
                    >
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'white' }}>
                            €{formatCurrency(listing.price)}
                          </Typography>
                        }
                        secondary={
                          <Box component="span">
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography 
                                component="span" 
                                variant="body2" 
                                fontWeight="medium"
                                color="#0a84ff"
                              >
                                {listing.year}
                              </Typography>
                              <Typography 
                                component="span" 
                                variant="body2" 
                                color="rgba(255, 255, 255, 0.5)"
                              >
                                {listing.location}
                              </Typography>
                            </Box>
                            <Typography 
                              component="span" 
                              variant="body2" 
                              color="rgba(255, 255, 255, 0.7)"
                              display="block"
                              sx={{ mb: 1 }}
                            >
                              {listing.mileage.toLocaleString()} {t('kilometers')}
                              {listing.version && ` • ${listing.version}`}
                            </Typography>
                            <Typography 
                              component="span" 
                              variant="body2"
                              display="block"
                              color="rgba(255, 255, 255, 0.8)"
                            >
                              {formatListingDescription(listing)}
                            </Typography>
                          </Box>
                        }
                      />
                    </Paper>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {/* Valuation Factors */}
          <Box>
            <Typography variant="h6" gutterBottom fontWeight="600" color="white">
              {t('valueFactorsTitle')}
            </Typography>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(auto-fill, minmax(200px, 1fr))' },
              gap: 2,
            }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: 'rgba(44, 44, 46, 0.8)', 
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'rgba(10, 132, 255, 0.3)',
                  backdropFilter: 'blur(5px)'
                }}
              >
                <Typography variant="body1" fontWeight="medium" color="#0a84ff" gutterBottom>
                  {t('marketDemandFactor')}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white' }}>
                  {valuation.factors.marketDemand > 0 ? '+' : ''}{Math.round(valuation.factors.marketDemand * 10) / 10}%
                </Typography>
                <Typography variant="body2" color="rgba(255, 255, 255, 0.5)" sx={{ mt: 1 }}>
                  {t('impactOnValue')}
                </Typography>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: 'rgba(44, 44, 46, 0.8)', 
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'rgba(255, 159, 10, 0.3)',
                  backdropFilter: 'blur(5px)'
                }}
              >
                <Typography variant="body1" fontWeight="medium" color="#ff9f0a" gutterBottom>
                  {t('vehicleConditionFactor')}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white' }}>
                  {valuation.factors.conditionImpact > 0 ? '+' : ''}{Math.round(valuation.factors.conditionImpact * 10) / 10}%
                </Typography>
                <Typography variant="body2" color="rgba(255, 255, 255, 0.5)" sx={{ mt: 1 }}>
                  {t('impactOnValue')}
                </Typography>
              </Paper>

              {valuation.factors.featuresPremium !== 0 && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: 'rgba(44, 44, 46, 0.8)', 
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'rgba(48, 209, 88, 0.3)',
                    backdropFilter: 'blur(5px)'
                  }}
                >
                  <Typography variant="body1" fontWeight="medium" color="#30d158" gutterBottom>
                    {t('equipmentFeaturesFactor')}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white' }}>
                    {valuation.factors.featuresPremium > 0 ? '+' : ''}{Math.round(valuation.factors.featuresPremium * 10) / 10}%
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.5)" sx={{ mt: 1 }}>
                    {t('impactOnValue')}
                  </Typography>
                </Paper>
              )}
            </Box>
          </Box>

          {/* Data Sources */}
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="caption" color="rgba(255, 255, 255, 0.4)">
              {t('dataSource')}: {valuation.source}
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#0a84ff' }}>
              Évaluation par <Box component="span" sx={{ fontWeight: 'bold' }}>AutoExpert</Box> © {new Date().getFullYear()}
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
        <Button 
          onClick={onBack} 
          variant="outlined" 
          size="large"
          sx={{ 
            px: 3,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 'medium',
            borderColor: 'rgba(80, 80, 85, 0.5)',
            color: 'rgba(255, 255, 255, 0.9)',
            '&:hover': {
              borderColor: 'rgba(10, 132, 255, 0.8)',
              bgcolor: 'rgba(10, 132, 255, 0.1)'
            }
          }}
        >
          {t('back')}
        </Button>
        <Button
          onClick={onRestart}
          variant="contained"
          size="large"
          startIcon={<RestartIcon />}
          sx={{ 
            px: 3,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 'medium',
            bgcolor: '#0a84ff',
            '&:hover': {
              bgcolor: '#0070df'
            }
          }}
        >
          {t('newValuation')} | AutoExpert
        </Button>
      </Stack>
    </Box>
  );
} 