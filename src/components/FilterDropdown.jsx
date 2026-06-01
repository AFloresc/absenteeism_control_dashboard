import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function FilterDropdown({ label, value, onChange, options, allLabel }) {
  return (
    <FormControl fullWidth size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
      >
        <MenuItem value="All">{allLabel}</MenuItem>
        {options.map((opt) => {
          const optValue = typeof opt === 'object' ? opt.value : opt;
          const optLabel = typeof opt === 'object' ? opt.label : opt;
          return (
            <MenuItem key={optValue} value={optValue}>
              {optLabel}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
