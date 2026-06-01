import React from 'react';
import { Box, Typography } from '@mui/material';

export default function CustomChartTooltip({ active, payload, label, isDark }) {
  if (active && payload && payload.length) {
    return (
      <Box 
        sx={{ 
          backgroundColor: 'background.paper', 
          border: '1px solid',
          borderColor: 'divider', 
          borderRadius: '8px', 
          p: 1.5,
          boxShadow: isDark 
            ? '0 4px 6px -1px rgba(0,0,0,0.5)' 
            : '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.05)' 
        }}
      >
        <Typography variant="subtitle2" color="text.primary" sx={{ mb: 1, fontWeight: '700' }}>
          {label}
        </Typography>
        {payload.map((entry, index) => (
          <Typography key={index} variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: entry.color, display: 'inline-block' }}></span>
            {entry.name}: <strong style={{ color: 'text.primary' }}>{entry.value}</strong> {entry.name.includes('Days') || entry.name.includes('Average') ? 'Days' : 'Incidents'}
          </Typography>
        ))}
      </Box>
    );
  }
  return null;
}
