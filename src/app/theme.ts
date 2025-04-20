import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#007AFF', // iOS blue
      light: '#5856D6',
      dark: '#0056b3',
    },
    secondary: {
      main: '#5856D6', // iOS purple
      light: '#7A79E0',
      dark: '#3E3BA3',
    },
    error: {
      main: '#FF3B30', // iOS red
    },
    warning: {
      main: '#FF9500', // iOS orange
    },
    success: {
      main: '#34C759', // iOS green
    },
    background: {
      default: '#1C1C1E', // Dark background
      paper: '#2C2C2E', // Slightly lighter for paper components
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#EBEBF5',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      letterSpacing: '0em',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      letterSpacing: '0.0075em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '0.9375rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            opacity: 0.9,
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          borderRadius: 16,
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        },
        elevation2: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
        },
        elevation3: {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: '#2C2C2E',
            '&:hover': {
              backgroundColor: '#3A3A3C',
            },
            '&.Mui-focused': {
              backgroundColor: '#2C2C2E',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          '&.Mui-active': {
            fontWeight: 600,
          },
          '&.Mui-completed': {
            fontWeight: 500,
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
});

export default theme; 