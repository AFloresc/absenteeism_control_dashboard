import React from 'react';
import { 
  Box, 
  Typography, 
  TableContainer, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  Paper, 
  Chip 
} from '@mui/material';
import { Sparkles } from 'lucide-react';
import { calculateDaysBetween } from '../utils.js';

export default function PersonStatsRowExpanded({ person }) {
  return (
    <Box sx={{ margin: 2, p: 2, backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(156, 39, 176, 0.04)' : '#faf5ff', borderRadius: '12px', border: '1px solid', borderColor: 'divider' }}>
      <Typography variant="subtitle2" gutterBottom color="secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: '700' }}>
        <Sparkles className="w-4 h-4 text-indigo-500" /> Personal Medical Absence Profile: {person.workerName}
      </Typography>
      
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
        Medical leave records assigned to this profile matching your active filters.
      </Typography>

      <TableContainer component={Paper} variant="outlined" sx={{ mt: 1, borderRadius: '8px', border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontSize: '11px', fontWeight: 'bold' }}>Incident ID</TableCell>
              <TableCell sx={{ fontSize: '11px', fontWeight: 'bold' }}>Department & Center</TableCell>
              <TableCell sx={{ fontSize: '11px', fontWeight: 'bold' }}>Sickness Duration</TableCell>
              <TableCell sx={{ fontSize: '11px', fontWeight: 'bold' }}>Clinical Pathology</TableCell>
              <TableCell sx={{ fontSize: '11px', fontWeight: 'bold' }}>Leave Category</TableCell>
              <TableCell sx={{ fontSize: '11px', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontSize: '11px', fontWeight: 'bold' }}>Case Manager Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {person.leaves.map((l) => {
              const dur = calculateDaysBetween(l.startDate, l.endDate);
              return (
                <TableRow key={l.id} hover>
                  <TableCell sx={{ fontFamily: 'monospace', fontSize: '11px' }}>{l.id}</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>{l.department} ({l.workCenter})</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}><strong>{dur} Days</strong> ({l.startDate} ➔ {l.endDate || 'Ongoing'})</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>{l.pathology}</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>{l.leaveType}</TableCell>
                  <TableCell sx={{ fontSize: '11px' }}>
                    <Chip 
                      label={l.status === 'Active' ? 'Active' : 'Closed'} 
                      size="small" 
                      color={l.status === 'Active' ? 'error' : 'success'}
                      sx={{ height: 16, fontSize: '10px' }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: '11px', color: 'text.secondary', fontStyle: 'italic', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {l.notes || 'No registry notes.'}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
