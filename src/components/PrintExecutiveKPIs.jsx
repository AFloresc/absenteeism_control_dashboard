import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

export default function PrintExecutiveKPIs({ totalIncidents, activeCases, totalDaysLost, averageDays }) {
  return (
    <Box sx={{ mb: 4 }} className="print-avoid-break">
      <Typography variant="subtitle1" sx={{ fontWeight: '800', borderBottom: '1px solid #cbd5e1', pb: 0.5, mb: 2, textTransform: 'uppercase' }}>
        Executive Presence Metrics
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 3 }}>
          <Box sx={{ border: '1px solid #cbd5e1', p: 1.5, borderRadius: '4px' }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: '700', textTransform: 'uppercase' }}>
              Total Registered Leaves
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: '800', mt: 0.5 }}>
              {totalIncidents} <span style={{ fontSize: '13px', fontWeight: 'normal', color: '#64748b' }}>incidents</span>
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 3 }}>
          <Box sx={{ border: '1px solid #cbd5e1', p: 1.5, borderRadius: '4px' }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: '700', textTransform: 'uppercase' }}>
              Currently Active
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: '800', mt: 0.5, color: '#2563eb' }}>
              {activeCases} <span style={{ fontSize: '13px', fontWeight: 'normal', color: '#64748b' }}>cases</span>
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 3 }}>
          <Box sx={{ border: '1px solid #cbd5e1', p: 1.5, borderRadius: '4px' }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: '700', textTransform: 'uppercase' }}>
              Cumulative Days Lost
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: '800', mt: 0.5, color: '#ef4444' }}>
              {totalDaysLost} <span style={{ fontSize: '13px', fontWeight: 'normal', color: '#64748b' }}>days</span>
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 3 }}>
          <Box sx={{ border: '1px solid #cbd5e1', p: 1.5, borderRadius: '4px' }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: '700', textTransform: 'uppercase' }}>
              Mean Absence Span
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: '800', mt: 0.5 }}>
              {averageDays} <span style={{ fontSize: '13px', fontWeight: 'normal', color: '#64748b' }}>days/leave</span>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
