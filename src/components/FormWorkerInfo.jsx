import React from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

export default function FormWorkerInfo({ formData, onChange, handleSelectChange, errors }) {
  return (
    <>
      <Typography variant="subtitle2" color="primary" sx={{ mb: 2, fontWeight: '700' }}>
        1. Worker Information
      </Typography>
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            name="workerName"
            label="Worker Full Name"
            fullWidth
            size="small"
            value={formData.workerName}
            onChange={onChange}
            error={!!errors.workerName}
            helperText={errors.workerName}
            required
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            name="workerEmail"
            label="Email Address"
            fullWidth
            size="small"
            type="email"
            value={formData.workerEmail}
            onChange={onChange}
            error={!!errors.workerEmail}
            helperText={errors.workerEmail}
            required
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            name="workerMobile"
            label="Mobile Contact"
            fullWidth
            size="small"
            value={formData.workerMobile}
            onChange={onChange}
            error={!!errors.workerMobile}
            helperText={errors.workerMobile}
            placeholder="+34 600 000 000"
            required
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Biological Sex</InputLabel>
            <Select
              value={formData.workerSex}
              label="Biological Sex"
              onChange={(e) => handleSelectChange('workerSex', e.target.value)}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}
