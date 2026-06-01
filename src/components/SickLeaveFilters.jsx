import React from 'react';
import { Paper, Grid, TextField, InputAdornment, IconButton, Button } from '@mui/material';
import { Search, X, Plus } from 'lucide-react';
import { 
  AVAILABLE_COMPANIES, 
  AVAILABLE_DEPARTMENTS, 
  AVAILABLE_WORK_CENTERS, 
  AVAILABLE_PATHOLOGIES 
} from '../mockData.js';
import FilterDropdown from './FilterDropdown.jsx';

export default function SickLeaveFilters({
  searchTerm, setSearchTerm,
  filterCompany, setFilterCompany,
  filterDepartment, setFilterDepartment,
  filterWorkCenter, setFilterWorkCenter,
  filterPathology, setFilterPathology,
  filterStatus, setFilterStatus,
  hasActiveFilters, handleClearFilters, onAddTrigger
}) {
  const filtersConfig = [
    { label: 'Company', value: filterCompany, onChange: setFilterCompany, options: AVAILABLE_COMPANIES, allLabel: 'All Companies', col: 2 },
    { label: 'Department', value: filterDepartment, onChange: setFilterDepartment, options: AVAILABLE_DEPARTMENTS, allLabel: 'All Departments', col: 2 },
    { label: 'Work Center', value: filterWorkCenter, onChange: setFilterWorkCenter, options: AVAILABLE_WORK_CENTERS, allLabel: 'All Centers', col: 2 },
    { label: 'Diagnosis', value: filterPathology, onChange: setFilterPathology, options: AVAILABLE_PATHOLOGIES, allLabel: 'All Pathologies', col: 2 },
    { label: 'Status', value: filterStatus, onChange: setFilterStatus, options: [{ value: 'Active', label: 'Active / Open' }, { value: 'Completed', label: 'Completed' }], allLabel: 'All', col: 1.5 }
  ];

  return (
    <Paper 
      sx={{ 
        p: 2.5, mb: 3, borderRadius: '12px', border: '1px solid', borderColor: 'divider',
        boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 4px 12px 0 rgba(0,0,0,0.4)' : '0 4px 12px 0 rgba(0,0,0,0.05)'
      }}
    >
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            size="small" fullWidth placeholder="Search by worker, email, ID or notes..."
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><Search className="w-4 h-4 text-gray-400" /></InputAdornment>,
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchTerm('')}><X className="w-3.5 h-3.5" /></IconButton>
                  </InputAdornment>
                )
              }
            }}
          />
        </Grid>
        
        {filtersConfig.map((cfg) => (
          <Grid size={{ xs: 6, sm: 4, md: cfg.col }} key={cfg.label}>
            <FilterDropdown 
              label={cfg.label} value={cfg.value} onChange={cfg.onChange} 
              options={cfg.options} allLabel={cfg.allLabel} 
            />
          </Grid>
        ))}

        <Grid size={{ xs: 12, sm: 4, md: 1.5 }} sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          {hasActiveFilters && (
            <Button variant="text" size="small" color="inherit" onClick={handleClearFilters} sx={{ textTransform: 'none', fontWeight: '600' }}>
              Clear
            </Button>
          )}
          <Button 
            variant="contained" size="small" color="primary" onClick={onAddTrigger}
            startIcon={<Plus className="w-4 h-4" />}
            sx={{ textTransform: 'none', fontWeight: '600', whiteSpace: 'nowrap' }}
          >
            Add Leave
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
