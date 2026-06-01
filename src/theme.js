import { createTheme } from '@mui/material';

// Define a custom, high-end theme for our dashboard with the "Professional Polish" design style
export function getCorporateTheme(mode) {
  const isDark = mode === 'dark';
  return createTheme({
    palette: {
      mode: mode,
      primary: {
        main: '#2563eb', // Beautiful brand blue
        dark: '#1d4ed8',
        light: isDark ? 'rgba(37, 99, 235, 0.15)' : '#eff6ff',
      },
      secondary: {
        main: '#4f46e5', // High-end indigo
        dark: '#4338ca',
        light: isDark ? 'rgba(79, 70, 229, 0.15)' : '#f5f3ff',
      },
      error: {
        main: '#ef4444', 
        light: isDark ? 'rgba(239, 68, 68, 0.12)' : '#fef2f2',
      },
      success: {
        main: '#10b981', 
        light: isDark ? 'rgba(16, 185, 129, 0.12)' : '#ecfdf5',
      },
      warning: {
        main: '#f59e0b', 
        light: isDark ? 'rgba(245, 158, 11, 0.12)' : '#fffbeb',
      },
      background: {
        default: isDark ? '#0b0f19' : '#f8fafc', // Sophisticated obsidian/slate-950 dark background, slate-50 light background
        paper: isDark ? '#111827' : '#ffffff', // Dark slate-900 paper, or pure white
      },
      text: {
        primary: isDark ? '#f1f5f9' : '#0f172a', // slate-100 or slate-900
        secondary: isDark ? '#94a3b8' : '#475569', // slate-400 or slate-600
      },
      divider: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", Arial, sans-serif',
      h5: {
        fontWeight: 800,
        letterSpacing: '-0.025em',
        color: isDark ? '#f1f5f9' : '#0f172a',
      },
      h4: {
        fontWeight: 800,
        letterSpacing: '-0.03em',
        color: isDark ? '#f1f5f9' : '#0f172a',
      },
      h6: {
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: isDark ? '#f1f5f9' : '#0f172a',
      },
      subtitle1: {
        fontWeight: 600,
        color: isDark ? '#cbd5e1' : '#334155',
      },
      subtitle2: {
        fontWeight: 600,
        color: isDark ? '#94a3b8' : '#475569',
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: 'none',
            padding: '6px 16px',
            '&:hover': {
              boxShadow: 'none',
            }
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 12,
            borderColor: theme.palette.divider,
            borderWidth: '1px',
            borderStyle: 'solid',
            boxShadow: theme.palette.mode === 'dark' 
              ? '0 1px 3px 0 rgba(0, 0, 0, 0.5)' 
              : '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
            backgroundImage: 'none',
          })
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderColor: theme.palette.divider,
            backgroundImage: 'none',
          })
        }
      }
    }
  });
}
