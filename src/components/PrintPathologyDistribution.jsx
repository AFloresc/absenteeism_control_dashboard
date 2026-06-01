import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

export default function PrintPathologyDistribution({ pathologySummary, totalIncidents }) {
  return (
    <Box sx={{ mb: 4 }} className="print-avoid-break">
      <Typography variant="subtitle1" sx={{ fontWeight: '800', borderBottom: '1px solid #cbd5e1', pb: 0.5, mb: 1.5, textTransform: 'uppercase' }}>
        Pathology Distribution Breakdown
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 6 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid #0f172a', textAlign: 'left' }}>
                <th style={{ padding: '6px 0', fontWeight: '700' }}>Clinical Diagnostic Group</th>
                <th style={{ padding: '6px 0', fontWeight: '700', textAlign: 'right' }}>Cases</th>
                <th style={{ padding: '6px 0', fontWeight: '700', textAlign: 'right' }}>% Ratio</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(pathologySummary)
                .sort((a, b) => b[1] - a[1])
                .map(([pathologyName, count]) => {
                  const ratio = totalIncidents > 0 ? ((count / totalIncidents) * 100).toFixed(1) : 0;
                  return (
                    <tr key={pathologyName} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '6px 0', fontWeight: '600' }}>{pathologyName}</td>
                      <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: '700' }}>{count}</td>
                      <td style={{ padding: '6px 0', textAlign: 'right', color: '#475569' }}>{ratio}%</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Box sx={{ p: 2, border: '1px solid #cbd5e1', borderRadius: '4px', backgroundColor: '#f8fafc', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="body2" sx={{ fontWeight: '700', mb: 1 }}>
              Analytical Observations & Notes
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.5 }}>
              This document summarizes corporate attendance records. Fluctuations can correlate directly with local climate trends (respiratory groups) or workstation ergonomics parameters (musculoskeletal). Direct all concerns, accommodations requests, or return-to-work workstation adjustments to the Corporate Medical Office and Health & Safety units.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
