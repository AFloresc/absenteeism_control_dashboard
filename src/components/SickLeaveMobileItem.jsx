import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Button, IconButton, Chip, Collapse } from '@mui/material';
import { ChevronUp, ChevronDown, CheckCircle, Edit3, Trash2 } from 'lucide-react';
import { calculateDaysBetween } from '../utils.js';

const PATHOLOGY_COLORS = {
  'Musculoskeletal': 'primary', 'Mental Health': 'secondary',
  'Respiratory': 'info', 'Cardiovascular': 'error', 'Digestive': 'warning'
};

export default function SickLeaveMobileItem({ leave, isExpanded, onToggle, onComplete, onEdit, onDelete }) {
  const daysCalculated = calculateDaysBetween(leave.startDate, leave.endDate);

  return (
    <Card 
      sx={{ 
        borderRadius: '12px', border: '1px solid', borderColor: isExpanded ? 'primary.main' : 'divider',
        backgroundColor: isExpanded ? (theme) => theme.palette.mode === 'dark' ? 'rgba(37, 99, 235, 0.08)' : '#eff6ff' : 'background.paper', boxShadow: 'none'
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: '800' }}>{leave.workerName}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>{leave.company} • ID: {leave.id}</Typography>
          </Box>
          <Chip label={leave.status === 'Active' ? 'Active' : 'Closed'} size="small" color={leave.status === 'Active' ? 'error' : 'success'} sx={{ height: '20px', fontSize: '10px', fontWeight: '800' }} />
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 1.5 }}>
          <Chip label={`${daysCalculated} ${daysCalculated === 1 ? 'Day' : 'Days'}`} size="small" variant="outlined" sx={{ height: '22px', fontSize: '11px', fontWeight: 'bold' }} />
          <Chip label={leave.pathology} size="small" color={PATHOLOGY_COLORS[leave.pathology] || 'default'} variant="outlined" sx={{ height: '22px', fontSize: '11px' }} />
          <Chip label={leave.leaveType} size="small" sx={{ height: '22px', fontSize: '11px', backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#f1f5f9', color: 'text.primary' }} />
        </Box>

        <Box sx={{ borderTop: '1.5px dashed', borderColor: 'divider', pt: 1.5, mt: 1 }}>
          <Grid container spacing={1}>
            <Grid size={6}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 'bold' }}>Span Dates:</Typography>
              <Typography variant="caption" color="text.primary">{leave.startDate} ➔ {leave.endDate || 'Ongoing'}</Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 'bold' }}>Department & Center:</Typography>
              <Typography variant="caption" color="text.primary" sx={{ display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{leave.department} • {leave.workCenter}</Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1.5, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button 
            size="small" variant="text" onClick={onToggle} endIcon={isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            sx={{ textTransform: 'none', py: 0, px: 0.5, fontSize: '12px' }}
          >
            {isExpanded ? 'Hide Details' : 'Show Details'}
          </Button>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {leave.status === 'Active' && (
              <IconButton 
                size="small" color="success" sx={{ border: '1px solid rgba(16, 185, 129, 0.2)' }}
                onClick={() => { const today = new Date().toISOString().split('T')[0]; onComplete(leave.id, today); }}
              >
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              </IconButton>
            )}
            <IconButton size="small" color="primary" sx={{ border: '1px solid rgba(37, 99, 235, 0.2)' }} onClick={() => onEdit(leave)}><Edit3 className="w-3.5 h-3.5" /></IconButton>
            <IconButton size="small" color="error" sx={{ border: '1px solid rgba(239, 68, 68, 0.2)' }} onClick={() => onDelete(leave.id)}><Trash2 className="w-3.5 h-3.5" /></IconButton>
          </Box>
        </Box>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 1.5, p: 1.5, backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : '#f8fafc', borderRadius: '8px', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontWeight: '700', mb: 0.5 }}>Contact Details:</Typography>
            <Typography variant="body2" sx={{ fontSize: '12.5px' }}>Email: <strong>{leave.workerEmail}</strong></Typography>
            <Typography variant="body2" sx={{ fontSize: '12.5px', mb: 1 }}>Mobile: <strong>{leave.workerMobile}</strong> ({leave.workerSex})</Typography>
            <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontWeight: '700', mb: 0.5 }}>Case Sickness Notes:</Typography>
            <Typography variant="body2" sx={{ fontSize: '12px', fontStyle: 'italic', backgroundColor: 'background.paper', p: 1, borderRadius: '4px', border: '1px solid', borderColor: 'divider' }}>
              {leave.notes || 'No doctor details or specific Clinical restrictions were entered.'}
            </Typography>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
}
