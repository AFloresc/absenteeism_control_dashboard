import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  InputAdornment
} from '@mui/material';
import { Search } from 'lucide-react';
import { calculatePersonKPIs } from '../utils.js';
import PersonStatsDesktopTable from './PersonStatsDesktopTable.jsx';
import PersonStatsMobileList from './PersonStatsMobileList.jsx';

export default function PersonStats({ leaves }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedWorker, setExpandedWorker] = useState(null);

  const peopleData = calculatePersonKPIs(leaves);

  // Filter based on search query
  const filteredPeople = peopleData.filter(p => 
    p.workerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRowToggle = (workerKey) => {
    setExpandedWorker(expandedWorker === workerKey ? null : workerKey);
  };

  return (
    <Card sx={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05),  0 1px 2px -1px rgba(0, 0, 0, 0.05)', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2, mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: '700' }}>
              Worker-Centric Incident Analytics
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Track chronic recurrences and analyze individual leave metrics to guide employee support programs.
            </Typography>
          </Box>
          <TextField
            size="small"
            placeholder="Search by worker or entity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ maxWidth: { sm: 300 }, width: '100%' }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="w-4 h-4 text-gray-400" />
                  </InputAdornment>
                )
              }
            }}
          />
        </Box>

        {/* Worker statistics table for Desktop */}
        <PersonStatsDesktopTable
          filteredPeople={filteredPeople}
          expandedWorker={expandedWorker}
          handleRowToggle={handleRowToggle}
        />

        {/* Mobile-Responsive List of Cards */}
        <PersonStatsMobileList
          filteredPeople={filteredPeople}
          expandedWorker={expandedWorker}
          handleRowToggle={handleRowToggle}
        />
      </CardContent>
    </Card>
  );
}
