import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';
import PersonStatsRow from './PersonStatsRow.jsx';

export default function PersonStatsDesktopTable({
  filteredPeople,
  expandedWorker,
  handleRowToggle
}) {
  return (
    <TableContainer 
      component={Paper} 
      variant="outlined" 
      sx={{ 
        display: { xs: 'none', md: 'block' }, 
        borderRadius: '12px', 
        overflow: 'hidden', 
        border: '1px solid', 
        borderColor: 'divider' 
      }}
    >
      <Table size="small">
        <TableHead sx={{ backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc', borderBottom: '1px solid', borderColor: 'divider' }}>
          <TableRow>
            <TableCell width="45px" />
            <TableCell sx={{ fontWeight: '700', py: 1.5, color: 'text.primary' }}>Employee Profile</TableCell>
            <TableCell sx={{ fontWeight: '700', color: 'text.primary' }}>Employer Entity</TableCell>
            <TableCell align="center" sx={{ fontWeight: '700', color: 'text.primary' }}>Leave Recurrences</TableCell>
            <TableCell align="center" sx={{ fontWeight: '700', color: 'text.primary' }}>Total Days Lost</TableCell>
            <TableCell align="center" sx={{ fontWeight: '700', color: 'text.primary' }}>Avg. Duration / Case</TableCell>
            <TableCell align="center" sx={{ fontWeight: '700', color: 'text.primary' }}>Impact Classification</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredPeople.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                <Typography color="text.secondary" variant="body2">
                  No worker records found matching your query.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            filteredPeople.map((person) => {
              const workerKey = `${person.workerName}||${person.company}`;
              return (
                <PersonStatsRow 
                  key={workerKey}
                  person={person}
                  isExpanded={expandedWorker === workerKey}
                  onToggle={() => handleRowToggle(workerKey)}
                />
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
