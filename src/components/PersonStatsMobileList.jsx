import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import PersonStatsMobileItem from './PersonStatsMobileItem.jsx';

export default function PersonStatsMobileList({
  filteredPeople,
  expandedWorker,
  handleRowToggle
}) {
  return (
    <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 2, mt: 1 }}>
      {filteredPeople.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '12px', border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary">
            No worker records found matching your query.
          </Typography>
        </Paper>
      ) : (
        filteredPeople.map((person) => {
          const workerKey = `${person.workerName}||${person.company}`;
          return (
            <PersonStatsMobileItem 
              key={workerKey}
              person={person}
              isExpanded={expandedWorker === workerKey}
              onToggle={() => handleRowToggle(workerKey)}
            />
          );
        })
      )}
    </Box>
  );
}
