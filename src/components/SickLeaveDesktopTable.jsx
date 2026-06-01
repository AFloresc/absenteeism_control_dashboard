import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import { Compass } from 'lucide-react';
import SickLeaveRow from './SickLeaveRow.jsx';

export default function SickLeaveDesktopTable({
  filteredLeaves,
  expandedId,
  handleRowExpand,
  hasActiveFilters,
  handleClearFilters,
  onComplete,
  onEdit,
  onDelete
}) {
  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        display: { xs: 'none', md: 'block' }, 
        borderRadius: '12px', border: '1px solid', borderColor: 'divider', 
        boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 1px 3px 0 rgba(0, 0, 0, 0.5)' : '0 1px 3px 0 rgba(0, 0, 0, 0.05)' 
      }}
    >
      <Table aria-label="sick leaves table" size="medium">
        <TableHead sx={{ backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc', borderBottom: '1px solid', borderColor: 'divider' }}>
          <TableRow>
            <TableCell width="40px" />
            <TableCell sx={{ fontWeight: '700', color: 'text.primary' }}>Worker / Company</TableCell>
            <TableCell sx={{ fontWeight: '700', color: 'text.primary' }}>Department & Center</TableCell>
            <TableCell sx={{ fontWeight: '700', color: 'text.primary' }}>Duration & Dates</TableCell>
            <TableCell sx={{ fontWeight: '700', color: 'text.primary' }}>Diagnosis & Type</TableCell>
            <TableCell sx={{ fontWeight: '700', color: 'text.primary' }}>Status</TableCell>
            <TableCell align="right" sx={{ fontWeight: '700', color: 'text.primary' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredLeaves.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                  <Compass className="w-10 h-10 text-gray-300" />
                  <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: '600' }}>No matching records found.</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'block', maxWidth: 350 }}>Try relaxing your filter parameters, erasing characters from the search term, or create a new sick leave entry.</Typography>
                  {hasActiveFilters && (
                    <Button variant="outlined" size="small" onClick={handleClearFilters} sx={{ textTransform: 'none', mt: 1 }}>Reset Filters</Button>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            filteredLeaves.map((leave) => (
              <SickLeaveRow 
                key={leave.id}
                leave={leave}
                isExpanded={expandedId === leave.id}
                onToggle={() => handleRowExpand(leave.id)}
                onComplete={onComplete}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
