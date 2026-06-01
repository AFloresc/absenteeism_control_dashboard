import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

export default function KPICardItem({ title, value, subtitle, icon, color, isDark }) {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        backgroundColor: 'background.paper',
        borderRadius: '12px',
        border: `1px solid`,
        borderColor: 'divider',
        boxShadow: isDark 
          ? '0 1px 3px 0 rgba(0,0,0,0.5)' 
          : '0 1px 3px 0 rgba(0,0,0,0.05), 0 1px 2px -1px rgba(0,0,0,0.05)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: isDark
            ? '0 4px 12px 0 rgba(0,0,0,0.6)'
            : '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
        }
      }}
    >
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
          <Typography 
            variant="caption" 
            sx={{ 
              fontSize: '11px', 
              fontWeight: '700', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em', 
              color: 'text.secondary' 
            }}
          >
            {title}
          </Typography>
          <Box 
            sx={{ 
              backgroundColor: color, 
              borderRadius: '8px', 
              p: 1.2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            {icon}
          </Box>
        </Box>
        
        <Typography variant="h4" component="div" sx={{ color: 'text.primary', mb: 0.5, fontWeight: '800', fontFamily: 'monospace', letterSpacing: '-0.02em' }}>
          {value}
        </Typography>
        
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: '500', fontSize: '12px' }}>
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}
