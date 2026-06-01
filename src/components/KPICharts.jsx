import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  ToggleButtonGroup, 
  ToggleButton, 
  Grid,
  useTheme 
} from '@mui/material';
import { 
  calculateCompanyKPIs, 
  calculateDepartmentKPIs, 
  calculateWorkCenterKPIs, 
  getPathologyDistribution, 
  getMonthlyTrend, 
  getLeaveTypeDistribution 
} from '../utils.js';

import SegmentationCharts from './SegmentationCharts.jsx';
import TrendChart from './TrendChart.jsx';
import PathologyChart from './PathologyChart.jsx';
import LeaveTypesChart from './LeaveTypesChart.jsx';

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#6366f1', '#06b6d4', '#8b5cf6', '#ec4899', '#64748b'];

export default function KPICharts({ leaves }) {
  const [metricType, setMetricType] = useState('duration');
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Compute aggregation data
  const companyData = calculateCompanyKPIs(leaves);
  const departmentData = calculateDepartmentKPIs(leaves);
  const workCenterData = calculateWorkCenterKPIs(leaves);
  const pathologyData = getPathologyDistribution(leaves);
  const monthlyTrendData = getMonthlyTrend(leaves);
  const leaveTypeData = getLeaveTypeDistribution(leaves);

  const handleMetricChange = (event, newMetric) => {
    if (newMetric !== null) {
      setMetricType(newMetric);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      {/* Selector of metric to focus on for segmentation charts */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', sm: 'center' }, 
          gap: 2, 
          mb: 3 
        }}
      >
        <Typography variant="h6" color="text.primary" sx={{ fontWeight: '700' }}>
          KPI Metrics Segmentation
        </Typography>
        <ToggleButtonGroup
          value={metricType}
          exclusive
          onChange={handleMetricChange}
          aria-label="metric focus"
          size="small"
          color="primary"
          sx={{
            width: { xs: '100%', sm: 'auto' },
            '& .MuiToggleButton-root': {
              width: { xs: '50%', sm: 'auto' },
              textTransform: 'none',
              fontWeight: '600',
              fontSize: { xs: '12px', sm: '13px' }
            }
          }}
        >
          <ToggleButton value="duration" aria-label="average duration">
            Avg. Duration
          </ToggleButton>
          <ToggleButton value="total" aria-label="total cases">
            Incident Volume
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Grid container spacing={3}>
        {/* Row 1: Company, Department, Work Center Comparison charts */}
        <Grid size={12}>
          <SegmentationCharts
            companyData={companyData}
            departmentData={departmentData}
            workCenterData={workCenterData}
            metricType={metricType}
            isMounted={isMounted}
            isDark={isDark}
            colors={COLORS}
          />
        </Grid>

        {/* Row 2: Chronological Trend chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <TrendChart 
            monthlyTrendData={monthlyTrendData} 
            isMounted={isMounted} 
            isDark={isDark} 
          />
        </Grid>

        {/* Row 2: Pathology Breakdown Pie chart */}
        <Grid size={{ xs: 12, md: 4 }}>
          <PathologyChart 
            pathologyData={pathologyData} 
            isMounted={isMounted} 
            colors={COLORS} 
          />
        </Grid>

        {/* Row 3: Leave Type Comparison chart */}
        <Grid size={12}>
          <LeaveTypesChart 
            leaveTypeData={leaveTypeData} 
            isMounted={isMounted} 
            isDark={isDark} 
          />
        </Grid>
      </Grid>
    </Box>
  );
}
