import React from 'react';
import { Box, Typography, Paper, RadioGroup, FormControlLabel, Radio } from '@mui/material';

export default function ExportDatasetScope({ 
  exportScope, 
  setExportScope, 
  activeCompany, 
  filteredLeavesCount, 
  totalLeavesCount 
}) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: '700', mb: 1, color: 'text.primary' }}>
        1. Choose Dataset Scope
      </Typography>
      <Paper variant="outlined" sx={{ p: 2, borderRadius: '12px', backgroundColor: '#f8fafc' }}>
        <RadioGroup 
          value={exportScope} 
          onChange={(e) => setExportScope(e.target.value)}
        >
          <FormControlLabel 
            value="filtered" 
            control={<Radio size="small" />} 
            label={
              <Box sx={{ ml: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: '700', color: 'text.primary' }}>
                  Active Filter Set ({activeCompany === 'All' ? 'All Companies' : activeCompany})
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: '500' }}>
                  Exports {filteredLeavesCount} matching incidents according to current filters & search.
                </Typography>
              </Box>
            } 
            sx={{ mb: 1.5, alignItems: 'flex-start' }}
          />
          
          <FormControlLabel 
            value="all" 
            control={<Radio size="small" />} 
            label={
              <Box sx={{ ml: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: '700', color: 'text.primary' }}>
                  Full Global Database (All Corporate Entities)
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: '500' }}>
                  Exports all {totalLeavesCount} registered sick leaves, ignoring dashboard filters.
                </Typography>
              </Box>
            }
            sx={{ alignItems: 'flex-start' }}
          />
        </RadioGroup>
      </Paper>
    </Box>
  );
}
