import React from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { 
  AVAILABLE_PATHOLOGIES, 
  AVAILABLE_LEAVE_TYPES 
} from '../mockData.js';

export default function FormLeaveDetails({ 
  formData, 
  onChange, 
  handleSelectChange, 
  errors 
}) {
  return (
    <>
      <Typography variant="subtitle2" color="primary" sx={{ mb: 2, fontWeight: '700' }}>
        3. Sick Leave Details
      </Typography>
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Pathology / Diagnosis</InputLabel>
            <Select
              value={formData.pathology}
              label="Pathology / Diagnosis"
              onChange={(e) => handleSelectChange('pathology', e.target.value)}
            >
              {AVAILABLE_PATHOLOGIES.map((p) => (
                <MenuItem key={p} value={p}>{p}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Type of Sick Leave</InputLabel>
            <Select
              value={formData.leaveType}
              label="Type of Sick Leave"
              onChange={(e) => handleSelectChange('leaveType', e.target.value)}
            >
              {AVAILABLE_LEAVE_TYPES.map((lt) => (
                <MenuItem key={lt} value={lt}>{lt}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Current Status</InputLabel>
            <Select
              value={formData.status}
              label="Current Status"
              onChange={(e) => handleSelectChange('status', e.target.value)}
            >
              <MenuItem value="Active">Active / Ongoing</MenuItem>
              <MenuItem value="Completed">Completed / Closed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            name="startDate"
            label="Start Date"
            type="date"
            fullWidth
            size="small"
            value={formData.startDate}
            onChange={onChange}
            error={!!errors.startDate}
            helperText={errors.startDate}
            slotProps={{
              inputLabel: { shrink: true }
            }}
            required
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            name="endDate"
            label="End Date"
            type="date"
            fullWidth
            size="small"
            value={formData.endDate}
            onChange={onChange}
            disabled={formData.status === 'Active'}
            error={!!errors.endDate}
            helperText={errors.endDate || (formData.status === 'Active' ? 'Ongoing - leave active' : '')}
            slotProps={{
              inputLabel: { shrink: true }
            }}
            required={formData.status === 'Completed'}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            name="notes"
            label="Case Diagnostic Notes & Accommodations"
            multiline
            rows={3}
            fullWidth
            value={formData.notes}
            onChange={onChange}
            placeholder="List medical symptoms, restrictions, workspace adjustments, support plans, etc."
          />
        </Grid>
      </Grid>
    </>
  );
}
