import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { Mail, Phone, CheckCircle, Edit3 } from 'lucide-react';

export default function SickLeaveRowExpanded({ leave, daysCalculated, onComplete, onEdit }) {
  return (
    <Box sx={{ margin: 2, p: 2, backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : '#f8fafc', borderRadius: '12px', border: '1px solid', borderColor: 'divider' }}>
      <Typography variant="subtitle2" gutterBottom color="primary" sx={{ fontWeight: '700' }}>
        Detailed Sickness File & Case Progress
      </Typography>
      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontWeight: '700' }}>
            Contact Profile:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 0.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Mail className="w-3.5 h-3.5 text-gray-400" />
              <Typography variant="body2">{leave.workerEmail}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Phone className="w-3.5 h-3.5 text-gray-400" />
              <Typography variant="body2">{leave.workerMobile}</Typography>
            </Box>
            <Typography variant="body2" sx={{ ml: 4, fontStyle: 'italic' }}>
              Sex: {leave.workerSex}
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontWeight: '700' }}>
            Location & Placement Info:
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            <strong>Branch/Entity:</strong> {leave.company}
          </Typography>
          <Typography variant="body2">
            <strong>Department Unit:</strong> {leave.department}
          </Typography>
          <Typography variant="body2">
            <strong>Regional facility:</strong> {leave.workCenter}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontWeight: '700' }}>
            Clinical Classification:
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            <strong>Pathology Group:</strong> {leave.pathology}
          </Typography>
          <Typography variant="body2">
            <strong>Regulatory Type:</strong> {leave.leaveType}
          </Typography>
          <Typography variant="body2">
            <strong>Absence Span:</strong> {daysCalculated} calendar days
          </Typography>
        </Grid>

        <Grid size={12} sx={{ mt: 1 }}>
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontWeight: '700' }}>
            Diagnosis notes, restrictions & workstation adjustments:
          </Typography>
          <Paper variant="outlined" sx={{ p: 1.5, mt: 0.5, backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.01)' : '#ffffff', borderStyle: 'dashed' }}>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
              {leave.notes || "No workspace adjustment or special clinical details were declared for this worker's sick leave case file."}
            </Typography>
          </Paper>
        </Grid>

        <Grid size={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          {leave.status === 'Active' && (
            <Button 
              size="small" 
              variant="outlined" 
              color="success" 
              startIcon={<CheckCircle className="w-4 h-4" />}
              onClick={() => {
                const today = new Date().toISOString().split('T')[0];
                onComplete(leave.id, today);
              }}
              sx={{ textTransform: 'none', fontWeight: '600' }}
            >
              Set End Date (Close Case)
            </Button>
          )}
          <Button 
            size="small" 
            variant="outlined" 
            color="primary" 
            startIcon={<Edit3 className="w-4 h-4" />}
            onClick={() => onEdit(leave)}
            sx={{ textTransform: 'none', fontWeight: '600' }}
          >
            Modify Fields
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
