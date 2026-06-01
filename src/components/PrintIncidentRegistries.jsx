import React from 'react';
import { Box, Typography } from '@mui/material';
import { calculateDaysBetween } from '../utils.js';

export default function PrintIncidentRegistries({ targetRecords }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: '800', borderBottom: '1px solid #cbd5e1', pb: 0.5, mb: 2, textTransform: 'uppercase' }}>
        Absenteeism Incident Registries ({targetRecords.length} records)
      </Typography>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '1.5px solid #0f172a', backgroundColor: '#f1f5f9' }}>
            <th style={{ padding: '6px 8px', fontWeight: '700' }}>Incident ID</th>
            <th style={{ padding: '6px 8px', fontWeight: '700' }}>Worker / Entity</th>
            <th style={{ padding: '6px 8px', fontWeight: '700' }}>Diagnostic / Type</th>
            <th style={{ padding: '6px 8px', fontWeight: '700' }}>Dates Span</th>
            <th style={{ padding: '6px 8px', fontWeight: '700', textAlign: 'right' }}>Days Lost</th>
            <th style={{ padding: '6px 8px', fontWeight: '700', textAlign: 'center' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {targetRecords.map((l) => {
            const daysDuration = calculateDaysBetween(l.startDate, l.endDate);
            return (
              <tr key={l.id} style={{ borderBottom: '1px solid #cbd5e1' }}>
                <td style={{ padding: '6px 8px', fontFamily: 'monospace', fontWeight: '700' }}>{l.id}</td>
                <td style={{ padding: '6px 8px' }}>
                  <Typography variant="caption" sx={{ fontWeight: '700', display: 'block', color: 'text.primary' }}>{l.workerName}</Typography>
                  <span style={{ fontSize: '9px', color: '#64748b', display: 'block' }}>{l.company} &bull; {l.department}</span>
                </td>
                <td style={{ padding: '6px 8px' }}>
                  <span style={{ fontWeight: '600' }}>{l.pathology}</span>
                  <span style={{ fontSize: '9px', color: '#64748b', display: 'block' }}>{l.leaveType}</span>
                </td>
                <td style={{ padding: '6px 8px' }}>
                  <span>{l.startDate} &mdash; {l.endDate || 'Ongoing'}</span>
                </td>
                <td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: '800' }}>{daysDuration}</td>
                <td style={{ padding: '6px 8px', textAlign: 'center' }}>
                  <span style={{ 
                    padding: '2px 6px', 
                    borderRadius: '3px', 
                    fontSize: '9px', 
                    fontWeight: '700',
                    backgroundColor: l.status === 'Active' ? '#fef2f2' : '#f0fdf4',
                    color: l.status === 'Active' ? '#ef4444' : '#16a34a',
                    border: l.status === 'Active' ? '1px solid #fecaca' : '1px solid #bbf7d0'
                  }}>
                    {l.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Box>
  );
}
