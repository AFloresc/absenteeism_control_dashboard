import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { HeartPulse, Sun, Moon } from 'lucide-react';

export default function BrandSection({ themeMode, toggleThemeMode }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: { xs: '100%', md: 'auto' }, gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box 
          sx={{ 
            backgroundColor: 'primary.main', 
            borderRadius: '8px', 
            p: { xs: 0.8, sm: 1.2 }, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#fff'
          }}
        >
          <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6" />
        </Box>
        <Box>
          <Typography variant="h6" color="text.primary" sx={{ fontWeight: '800', fontSize: { xs: '16px', sm: '20px' }, lineHeight: 1.1 }}>
            SanaCorp
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: '700', fontSize: { xs: '10px', sm: '12px' }, display: { xs: 'none', sm: 'block' } }}>
            Sick Leave Analytics & Workforce Portal
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: '700', fontSize: '10px', display: { xs: 'block', sm: 'none' } }}>
            Leave Analytics
          </Typography>
        </Box>
      </Box>

      {/* Light/Dark theme switch for mobile layout */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <IconButton 
          onClick={toggleThemeMode} 
          size="small"
          sx={{ 
            border: '1px solid',
            borderColor: themeMode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.12)',
            p: 0.75,
            color: themeMode === 'light' ? 'text.secondary' : 'warning.main'
          }}
          title={themeMode === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {themeMode === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </IconButton>
      </Box>
    </Box>
  );
}
