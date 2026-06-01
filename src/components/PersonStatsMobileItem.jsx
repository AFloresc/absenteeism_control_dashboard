import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Chip, 
  Button, 
  Collapse 
} from '@mui/material';
import { 
  User, 
  AlertTriangle, 
  Activity, 
  Award, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';
import { calculateDaysBetween } from '../utils.js';

export default function PersonStatsMobileItem({ person, isExpanded, onToggle }) {
  const isChronicRecurrent = person.totalLeavesCount >= 2;
  const isHighImpactDays = person.totalDaysLost > 25;

  return (
    <Card 
      sx={{ 
        borderRadius: '12px',
        border: '1px solid',
        borderColor: isExpanded ? 'secondary.main' : 'divider',
        backgroundColor: 'background.paper',
        boxShadow: 'none'
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box 
              sx={{ 
                width: 32, 
                height: 32, 
                borderRadius: '50%', 
                backgroundColor: isChronicRecurrent 
                  ? (theme) => theme.palette.mode === 'dark' ? 'rgba(156, 39, 176, 0.2)' : '#f3e5f5' 
                  : (theme) => theme.palette.mode === 'dark' ? 'rgba(33, 150, 243, 0.2)' : '#e3f2fd', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}
            >
              <User className={`w-4 h-4 ${isChronicRecurrent ? 'text-purple-600' : 'text-blue-600'}`} />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: '800' }}>{person.workerName}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>{person.company}</Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
            {isChronicRecurrent && (
              <Chip 
                icon={<AlertTriangle className="w-3 h-3 text-purple-600" />}
                label="Chronic Recurrent" 
                size="small" 
                color="secondary"
                sx={{ height: '18px', fontSize: '9px', fontWeight: '800' }}
              />
            )}
            {isHighImpactDays ? (
              <Chip 
                icon={<Activity className="w-3 h-3 text-red-600" />}
                label="Severe Lost Days" 
                size="small" 
                color="error" 
                variant="outlined"
                sx={{ height: '18px', fontSize: '9px', fontWeight: '800' }}
              />
            ) : (
              <Chip 
                icon={<Award className="w-3 h-3 text-emerald-600" />}
                label="Stable Threshold" 
                size="small" 
                color="success" 
                variant="outlined"
                sx={{ height: '18px', fontSize: '9px', fontWeight: '800' }}
              />
            )}
          </Box>
        </Box>

        <Grid container spacing={1} sx={{ backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : '#f8fafc', p: 1.5, borderRadius: '8px', border: '1px solid', borderColor: 'divider', mb: 1.5 }}>
          <Grid size={4}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textTransform: 'uppercase', fontSize: '9px', fontWeight: 'bold' }}>Leave Cases</Typography>
            <Typography variant="body2" sx={{ fontWeight: '800', fontFamily: 'monospace' }}>{person.totalLeavesCount}</Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textTransform: 'uppercase', fontSize: '9px', fontWeight: 'bold' }}>Days Lost</Typography>
            <Typography variant="body2" sx={{ fontWeight: '800', fontFamily: 'monospace', color: isHighImpactDays ? 'error.main' : 'text.primary' }}>{person.totalDaysLost} d</Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textTransform: 'uppercase', fontSize: '9px', fontWeight: 'bold' }}>Avg/Case</Typography>
            <Typography variant="body2" sx={{ fontWeight: '800', fontFamily: 'monospace' }}>{person.averageDays} d</Typography>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button 
            size="small"
            variant="text"
            color="secondary"
            onClick={onToggle}
            endIcon={isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            sx={{ textTransform: 'none', py: 0, px: 0.5, fontSize: '12px', fontWeight: '700' }}
          >
            {isExpanded ? 'Hide portfolio history' : `View portfolio list (${person.totalLeavesCount})`}
          </Button>
        </Box>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 1.5, borderTop: '1px solid', borderColor: 'divider', pt: 1.5 }}>
            <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontWeight: 'bold', mb: 1 }}>Assigned Absences Portfolio:</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {person.leaves.map((l) => {
                const ld = calculateDaysBetween(l.startDate, l.endDate);
                return (
                  <Box key={l.id} sx={{ p: 1.2, borderRadius: '6px', border: '1px solid', borderColor: 'divider', backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.01)' : '#ffffff' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Case ID: {l.id} ({l.leaveType})</Typography>
                      <Chip label={`${ld}d`} size="small" sx={{ height: '16px', fontSize: '10px', fontWeight: '800' }} />
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>{l.startDate} ➔ {l.endDate || 'Ongoing'} ({l.pathology})</Typography>
                    {l.notes && <Typography variant="caption" sx={{ display: 'block', mt: 0.5, fontStyle: 'italic', color: 'text.secondary' }}>Notes: {l.notes}</Typography>}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
}
