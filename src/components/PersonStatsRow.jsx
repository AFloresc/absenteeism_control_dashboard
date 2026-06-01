import React from 'react';
import { TableRow, TableCell, IconButton, Box, Typography, Chip, Collapse, Tooltip } from '@mui/material';
import { ChevronDown, ChevronUp, User, AlertTriangle, Activity, Award } from 'lucide-react';
import PersonStatsRowExpanded from './PersonStatsRowExpanded.jsx';

export default function PersonStatsRow({ person, isExpanded, onToggle }) {
  const isChronicRecurrent = person.totalLeavesCount >= 2;
  const isHighImpactDays = person.totalDaysLost > 25;

  const getBradfordColor = (score) => {
    if (score >= 500) return 'error.main'; 
    if (score >= 125) return 'warning.main'; 
    if (score >= 27) return 'info.main'; 
    return 'text.secondary';
  };

  const getBradfordLabel = (score) => {
    if (score >= 500) return 'High Concern';
    if (score >= 125) return 'Med Concern';
    if (score >= 27) return 'Low Concern';
    return 'Optimal';
  };

  return (
    <React.Fragment>
      <TableRow 
        hover 
        onClick={onToggle}
        sx={{ 
          cursor: 'pointer',
          backgroundColor: isExpanded ? (theme) => theme.palette.mode === 'dark' ? 'rgba(37, 99, 235, 0.15)' : '#eff6ff' : 'transparent',
          '& > *': { borderBottom: 'unset' }
        }}
      >
        <TableCell>
          <IconButton size="small" onClick={(e) => { e.stopPropagation(); onToggle(); }}>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
              <User className={`w-4 h-4 ${isChronicRecurrent ? 'text-purple-700' : 'text-blue-700'}`} />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: '700' }}>{person.workerName}</Typography>
              <Typography variant="caption" color="text.secondary">{person.leaves[0]?.workerEmail}</Typography>
            </Box>
          </Box>
        </TableCell>
        <TableCell><Typography variant="body2">{person.company}</Typography></TableCell>
        <TableCell align="center">
          <Typography variant="body2" sx={{ fontWeight: '700', color: isChronicRecurrent ? 'secondary.main' : 'inherit' }}>
            {person.totalLeavesCount}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body2" sx={{ fontWeight: '700', color: isHighImpactDays ? 'error.main' : 'inherit' }}>
            {person.totalDaysLost} Days
          </Typography>
        </TableCell>
        <TableCell align="center"><Typography variant="body2">{person.averageDays} Days</Typography></TableCell>
        <TableCell align="center">
          <Tooltip title={`Bradford Factor: S² × D where S is Spells (${person.totalLeavesCount}) and D is Days (${ person.totalDaysLost }). Score: ${ person.bradfordIndex }.`} arrow>
            <Box sx={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', px: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: '850', color: getBradfordColor(person.bradfordIndex) }}>
                {person.bradfordIndex}
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '9px', fontWeight: '700', color: getBradfordColor(person.bradfordIndex), opacity: 0.85 }}>
                {getBradfordLabel(person.bradfordIndex)}
              </Typography>
            </Box>
          </Tooltip>
        </TableCell>
        <TableCell align="center" onClick={(e) => e.stopPropagation()}>
          <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
            {isChronicRecurrent && (
              <Chip size="small" color="secondary" icon={<AlertTriangle className="w-3 h-3" />} label="Chronic" sx={{ fontSize: '10px', height: '20px', fontWeight: 'bold' }} />
            )}
            {isHighImpactDays && (
              <Chip size="small" color="error" icon={<Activity className="w-3 h-3" />} label="High" sx={{ fontSize: '10px', height: '20px', fontWeight: 'bold' }} />
            )}
            {!isChronicRecurrent && !isHighImpactDays && (
              <Chip size="small" color="success" icon={<Award className="w-3 h-3" />} label="Standard" sx={{ fontSize: '10px', height: '20px', fontWeight: '500' }} variant="outlined" />
            )}
          </Box>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <PersonStatsRowExpanded person={person} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
