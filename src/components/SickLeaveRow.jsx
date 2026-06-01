import React from 'react';
import { TableRow, TableCell, IconButton, Box, Typography, Chip, Tooltip, Collapse } from '@mui/material';
import { ChevronDown, ChevronUp, CheckCircle, Edit3, Trash2 } from 'lucide-react';
import { calculateDaysBetween } from '../utils.js';
import SickLeaveRowExpanded from './SickLeaveRowExpanded.jsx';

const PATHOLOGY_COLORS = {
  'Musculoskeletal': 'primary',
  'Mental Health': 'secondary',
  'Respiratory': 'info',
  'Cardiovascular': 'error',
  'Digestive': 'warning'
};

export default function SickLeaveRow({ leave, isExpanded, onToggle, onComplete, onEdit, onDelete }) {
  const daysCalculated = calculateDaysBetween(leave.startDate, leave.endDate);

  return (
    <React.Fragment>
      <TableRow 
        hover 
        sx={{ 
          '& > *': { borderBottom: 'unset' }, cursor: 'pointer',
          backgroundColor: isExpanded ? (theme) => theme.palette.mode === 'dark' ? 'rgba(37, 99, 235, 0.15)' : '#eff6ff' : 'transparent' 
        }}
        onClick={onToggle}
      >
        <TableCell onClick={(e) => e.stopPropagation()} width="45px">
          <IconButton size="small" onClick={onToggle}>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </IconButton>
        </TableCell>
        
        <TableCell>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body2" sx={{ fontWeight: '700' }}>{leave.workerName}</Typography>
            <Typography variant="caption" color="text.secondary">
              {leave.company} • ID: <strong style={{ fontFamily: 'monospace' }}>{leave.id}</strong>
            </Typography>
          </Box>
        </TableCell>

        <TableCell>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body2">{leave.department}</Typography>
            <Typography variant="caption" color="text.secondary">{leave.workCenter}</Typography>
          </Box>
        </TableCell>

        <TableCell>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body2" sx={{ fontWeight: '700' }}>{daysCalculated} {daysCalculated === 1 ? 'Day' : 'Days'}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>{leave.startDate} ➔ {leave.endDate || 'Ongoing'}</Typography>
          </Box>
        </TableCell>

        <TableCell>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, alignItems: 'flex-start' }}>
            <Chip 
              label={leave.pathology} size="small" color={PATHOLOGY_COLORS[leave.pathology] || 'default'} variant="outlined"
              sx={{ height: '20px', fontSize: '11px', fontWeight: '500' }}
            />
            <Typography variant="caption" color="text.secondary">{leave.leaveType}</Typography>
          </Box>
        </TableCell>

        <TableCell>
          <Chip 
            label={leave.status === 'Active' ? 'Active / Open' : 'Closed'} size="small"
            color={leave.status === 'Active' ? 'error' : 'success'} sx={{ height: '22px', fontSize: '11px', fontWeight: '700' }}
          />
        </TableCell>

        <TableCell align="right" onClick={(e) => e.stopPropagation()}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
            {leave.status === 'Active' && (
              <Tooltip title="Complete/Close Leave" arrow>
                <IconButton 
                  size="small" color="success"
                  onClick={() => {
                    const today = new Date().toISOString().split('T')[0];
                    onComplete(leave.id, today);
                  }}
                >
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Edit Case" arrow>
              <IconButton size="small" color="primary" onClick={() => onEdit(leave)}><Edit3 className="w-4 h-4" /></IconButton>
            </Tooltip>
            <Tooltip title="Remove Record" arrow>
              <IconButton size="small" color="error" onClick={() => onDelete(leave.id)}><Trash2 className="w-4 h-4" /></IconButton>
            </Tooltip>
          </Box>
        </TableCell>
      </TableRow>

      <TableRow onClick={(e) => e.stopPropagation()}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <SickLeaveRowExpanded 
              leave={leave} daysCalculated={daysCalculated} onComplete={onComplete} onEdit={onEdit} 
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
