import React from 'react';
import { Grid, useTheme } from '@mui/material';
import { 
  Activity, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Users 
} from 'lucide-react';
import { calculateDaysBetween } from '../utils.js';
import KPICardItem from './KPICardItem.jsx';

export default function KPICards({ leaves }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const totalCases = leaves.length;
  const activeCases = leaves.filter(l => l.status === 'Active').length;
  const completedCases = leaves.filter(l => l.status === 'Completed').length;
  const totalDaysLost = leaves.reduce((sum, l) => {
    return sum + calculateDaysBetween(l.startDate, l.endDate);
  }, 0);
  
  const averageDuration = totalCases > 0 
    ? (totalDaysLost / totalCases).toFixed(1) 
    : '0';

  // Calculate distinct workers
  const distinctWorkers = new Set(leaves.map(l => l.workerName)).size;

  // Average days lost per distinct worker
  const avgDaysPerWorker = distinctWorkers > 0 
    ? (totalDaysLost / distinctWorkers).toFixed(1) 
    : '0';

  const cardsData = [
    {
      title: 'Total Sick Leaves',
      value: totalCases,
      subtitle: `${completedCases} closed cases`,
      icon: <Calendar className="w-5 h-5 text-blue-600" />,
      color: isDark ? 'rgba(37, 99, 235, 0.15)' : '#eff6ff', 
    },
    {
      title: 'Active Leave Cases',
      value: activeCases,
      subtitle: 'Currently absent staff',
      icon: <Activity className="w-5 h-5 text-red-500" />,
      color: isDark ? 'rgba(239, 68, 68, 0.15)' : '#fef2f2', 
    },
    {
      title: 'Total Workdays Lost',
      value: `${totalDaysLost} Days`,
      subtitle: 'Cumulative lost capacity',
      icon: <Clock className="w-5 h-5 text-amber-500" />,
      color: isDark ? 'rgba(245, 158, 11, 0.15)' : '#fffbeb', 
    },
    {
      title: 'Avg. Leave Duration',
      value: `${averageDuration} Days`,
      subtitle: 'Per sick leave incident',
      icon: <AlertTriangle className="w-5 h-5 text-indigo-500" />,
      color: isDark ? 'rgba(79, 70, 229, 0.15)' : '#f5f3ff', 
    },
    {
      title: 'Distinct Workers Affected',
      value: distinctWorkers,
      subtitle: `Avg. ${avgDaysPerWorker} days lost / person`,
      icon: <Users className="w-5 h-5 text-emerald-500" />,
      color: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ecfdf5', 
    }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {cardsData.map((card, idx) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }} key={idx}>
          <KPICardItem 
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
            icon={card.icon}
            color={card.color}
            isDark={isDark}
          />
        </Grid>
      ))}
    </Grid>
  );
}
