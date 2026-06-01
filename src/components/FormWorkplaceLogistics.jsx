import React from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { 
  AVAILABLE_COMPANIES, 
  AVAILABLE_DEPARTMENTS, 
  AVAILABLE_WORK_CENTERS 
} from '../mockData.js';

export default function FormWorkplaceLogistics({ formData, handleSelectChange }) {
  return (
    <>
      <Typography variant="subtitle2" color="primary" sx={{ mb: 2, fontWeight: '700' }}>
        2. Professional & Workplace Logistics
      </Typography>
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Company</InputLabel>
            <Select
              value={formData.company}
              label="Company"
              onChange={(e) => handleSelectChange('company', e.target.value)}
            >
              {AVAILABLE_COMPANIES.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Department</InputLabel>
            <Select
              value={formData.department}
              label="Department"
              onChange={(e) => handleSelectChange('department', e.target.value)}
            >
              {AVAILABLE_DEPARTMENTS.map((d) => (
                <MenuItem key={d} value={d}>{d}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Work Center</InputLabel>
            <Select
              value={formData.workCenter}
              label="Work Center"
              onChange={(e) => handleSelectChange('workCenter', e.target.value)}
            >
              {AVAILABLE_WORK_CENTERS.map((wc) => (
                <MenuItem key={wc} value={wc}>{wc}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}
