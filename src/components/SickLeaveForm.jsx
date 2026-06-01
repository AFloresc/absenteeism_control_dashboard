import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { X, Save } from 'lucide-react';

import FormWorkerInfo from './FormWorkerInfo.jsx';
import FormWorkplaceLogistics from './FormWorkplaceLogistics.jsx';
import FormLeaveDetails from './FormLeaveDetails.jsx';
import useSickLeaveForm from '../hooks/useSickLeaveForm.js';

export default function SickLeaveForm({ open, onClose, onSave, leaveToEdit }) {
  const {
    formData,
    errors,
    handleChange,
    handleSelectChange,
    handleSubmit
  } = useSickLeaveForm({ open, onClose, onSave, leaveToEdit });

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: { borderRadius: '12px', p: 1 }
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: '700' }}>
          {leaveToEdit ? 'Modify Sick Leave Record' : 'Register New Sick Leave Incident'}
        </Typography>
        <Button onClick={onClose} sx={{ minWidth: 0, p: 1, borderRadius: '50%', color: 'text.secondary' }}>
          <X className="w-5 h-5" />
        </Button>
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 2 }}>
        <Box component="form" sx={{ mt: 1 }}>
          <FormWorkerInfo 
            formData={formData} 
            onChange={handleChange} 
            handleSelectChange={handleSelectChange} 
            errors={errors} 
          />
          
          <FormWorkplaceLogistics 
            formData={formData} 
            handleSelectChange={handleSelectChange} 
          />

          <FormLeaveDetails 
            formData={formData} 
            onChange={handleChange} 
            handleSelectChange={handleSelectChange} 
            errors={errors} 
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          startIcon={<Save className="w-4 h-4" />}
          sx={{ fontWeight: '600' }}
        >
          {leaveToEdit ? 'Save Changes' : 'Register Incident'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

