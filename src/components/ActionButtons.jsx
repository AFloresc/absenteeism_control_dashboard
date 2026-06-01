import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { RefreshCw, Download, Plus, Sun, Moon } from 'lucide-react';

export default function ActionButtons({
  themeMode,
  toggleThemeMode,
  globalCompany,
  activeCasesCount,
  onResetData,
  onExportClick,
  onAddIncidentClick
}) {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: { xs: 'space-between', md: 'flex-end' }, 
        gap: { xs: 1, sm: 1.5 }, 
        width: { xs: '100%', md: 'auto' },
        marginLeft: { md: 'auto' }
      }}
    >
      {/* Active indicator */}
      <Box 
        sx={{ 
          display: { xs: 'none', lg: 'flex' }, 
          alignItems: 'center', 
          gap: 1, 
          px: 1.5, 
          py: 0.75, 
          border: '1px solid',
          borderColor: 'divider', 
          borderRadius: '16px',
          backgroundColor: 'background.paper' 
        }}
      >
        <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: 'error.main' }} />
        <Typography 
          variant="caption" 
          sx={{ 
            fontWeight: '700',
            color: themeMode === 'light' ? '#1e293b' : '#cbd5e1'
          }}
        >
          {globalCompany === 'All' ? 'Active Cases' : `${globalCompany.split(' ')[0]} Active`}: {activeCasesCount}
        </Typography>
      </Box>

      {/* Light/Dark Theme Switch for Desktop layout */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <IconButton 
          onClick={toggleThemeMode} 
          size="small"
          sx={{ 
            border: '1px solid',
            borderColor: themeMode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.12)',
            p: 0.75,
            color: themeMode === 'light' ? 'text.secondary' : 'warning.main',
            transition: 'all 0.2s',
            '&:hover': {
              backgroundColor: themeMode === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)',
              transform: 'scale(1.05)',
            }
          }}
          title={themeMode === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {themeMode === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </IconButton>
      </Box>

      <Button 
        size="small"
        variant="outlined"
        onClick={onResetData}
        sx={{ 
          textTransform: 'none', 
          fontSize: '11px', 
          borderColor: themeMode === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)',
          color: themeMode === 'light' ? '#1e293b' : '#cbd5e1',
          px: { xs: 1, sm: 1.5 },
          minWidth: 'auto',
          '&:hover': { 
            borderColor: themeMode === 'light' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)', 
            backgroundColor: themeMode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)' 
          }
        }}
        title="Reset Demonstration parameters"
      >
        <RefreshCw className="w-3.5 h-3.5" style={{ color: themeMode === 'light' ? '#1e293b' : '#cbd5e1' }} />
        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' }, ml: 0.75 }}>
          Reset Demo
        </Box>
      </Button>

      <Button 
        size="small"
        variant="outlined"
        color="secondary"
        onClick={onExportClick}
        sx={{ 
          textTransform: 'none', 
          fontSize: '11px', 
          borderColor: 'secondary.light',
          backgroundColor: 'secondary.light',
          color: 'secondary.main',
          fontWeight: '700',
          px: { xs: 1, sm: 1.5 },
          minWidth: 'auto',
          '&:hover': { backgroundColor: 'secondary.main', color: '#fff', borderColor: 'secondary.main' }
        }}
        title="Export reports data"
      >
        <Download className="w-3.5 h-3.5" />
        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' }, ml: 0.75 }}>
          Export Reports
        </Box>
      </Button>

      <Button 
        variant="contained" 
        color="primary"
        size="small"
        onClick={onAddIncidentClick}
        sx={{ 
          fontWeight: '700', 
          textTransform: 'none', 
          px: { xs: 1.2, sm: 2 },
          minWidth: 'auto'
        }}
        title="Add new leave registry entry"
      >
        <Plus className="w-4 h-4" />
        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' }, ml: 0.75 }}>
          Add Incident
        </Box>
      </Button>
    </Box>
  );
}
