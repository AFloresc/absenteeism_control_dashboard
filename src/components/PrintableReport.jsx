import React from 'react';
import { Box, Typography } from '@mui/material';
import { calculateDaysBetween } from '../utils.js';
import PrintExecutiveKPIs from './PrintExecutiveKPIs.jsx';
import PrintPathologyDistribution from './PrintPathologyDistribution.jsx';
import PrintIncidentRegistries from './PrintIncidentRegistries.jsx';

export default function PrintableReport({
  targetRecords,
  exportScope,
  activeCompany,
  includeKPIs,
  includeChartsSummary,
  includeTableElements
}) {
  const totalIncidents = targetRecords.length;
  const activeCases = targetRecords.filter(l => l.status === 'Active').length;
  const totalDaysLost = targetRecords.reduce((sum, l) => sum + calculateDaysBetween(l.startDate, l.endDate), 0);
  const averageDays = totalIncidents > 0 ? parseFloat((totalDaysLost / totalIncidents).toFixed(1)) : 0;

  const pathologySummary = {};
  targetRecords.forEach(l => {
    pathologySummary[l.pathology] = (pathologySummary[l.pathology] || 0) + 1;
  });

  return (
    <Box id="printable-report-wrapper" sx={{ p: 4, color: '#0f172a', backgroundColor: '#fff' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', pb: 2, borderBottom: '2px solid #0f172a', mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: '800', tracking: '-0.03em', textTransform: 'uppercase', color: '#0f172a' }}>
            SanaCorp
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: '700', letterSpacing: '-0.01em', color: '#475569', mt: 0.5 }}>
            Workforce Presence Analysis & Sick Leave Report
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: '700', textTransform: 'uppercase' }}>
            Confidential Internal HR Document
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="body2" sx={{ fontWeight: '700' }}>
            <strong>Generated on:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            <strong>Scope:</strong> {exportScope === 'filtered' ? `Active Filtered (${activeCompany})` : 'Full Global Enterprise'}
          </Typography>
        </Box>
      </Box>

      {includeKPIs && (
        <PrintExecutiveKPIs 
          totalIncidents={totalIncidents} 
          activeCases={activeCases} 
          totalDaysLost={totalDaysLost} 
          averageDays={averageDays} 
        />
      )}

      {includeChartsSummary && (
        <PrintPathologyDistribution 
          pathologySummary={pathologySummary} 
          totalIncidents={totalIncidents} 
        />
      )}

      {includeTableElements && (
        <PrintIncidentRegistries 
          targetRecords={targetRecords} 
        />
      )}

      <Box sx={{ mt: 6, pt: 2, borderTop: '1px solid #94a3b8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="print-avoid-break">
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: '500' }}>
          SanaCorp Sick Leave Management Portal &copy; {new Date().getFullYear()}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: '600' }}>
          Page 1 of 1 (Corporate Registry Export)
        </Typography>
      </Box>
    </Box>
  );
}
