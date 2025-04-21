'use client';

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import theme from './theme';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ 
          flexGrow: 1,
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
        }}>
          <AppBar 
            position="static" 
            color="transparent" 
            elevation={0}
            sx={{
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(28, 28, 30, 0.8)',
            }}
          >
            <Toolbar>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  flexGrow: 1,
                  fontWeight: 600,
                  background: 'linear-gradient(90deg, #007AFF 0%, #5856D6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Vehicle Valuation
              </Typography>
            </Toolbar>
          </AppBar>
          <Container 
            component="main" 
            maxWidth="lg" 
            sx={{ 
              mt: { xs: 3, md: 6 }, 
              mb: { xs: 3, md: 6 },
              px: { xs: 2, sm: 3, md: 4 },
            }}
          >
            {children}
          </Container>
        </Box>
      </ThemeProvider>
    </I18nextProvider>
  );
} 