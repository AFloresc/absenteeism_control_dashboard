import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Compass } from 'lucide-react';
import SickLeaveMobileItem from './SickLeaveMobileItem.jsx';

export default function SickLeaveMobileList({
  filteredLeaves,
  expandedId,
  handleRowExpand,
  onComplete,
  onEdit,
  onDelete
}) {
  return (
    <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 2 }}>
      {filteredLeaves.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '12px', border: '1px solid', borderColor: 'divider' }}>
          <Compass className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <Typography variant="body2" color="text.secondary">No matching records found.</Typography>
        </Paper>
      ) : (
        filteredLeaves.map((leave) => (
          <SickLeaveMobileItem 
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
    </Box>
  );
}
