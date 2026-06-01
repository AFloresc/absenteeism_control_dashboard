import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { Card, CardContent, Grid, Typography, Box } from '@mui/material';
import { Building, Briefcase, MapPin } from 'lucide-react';
import CustomChartTooltip from './CustomChartTooltip.jsx';

export default function SegmentationCharts({ 
  companyData, 
  departmentData, 
  workCenterData, 
  metricType, 
  isMounted, 
  isDark, 
  colors 
}) {
  return (
    <Grid container spacing={3}>
      {/* 1. By Company comparison */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Building className="w-5 h-5 text-blue-500" />
              <Typography variant="subtitle1" sx={{ fontWeight: '700' }}>By Company</Typography>
            </Box>
            <Box sx={{ height: 260, width: '100%', minWidth: 0, position: 'relative' }}>
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                  <BarChart
                    data={companyData}
                    margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.06)' : '#f0f0f0'} />
                    <XAxis 
                      dataKey="companyName" 
                      tick={{ fill: isDark ? '#94a3b8' : '#475569', fontSize: 10 }}
                      tickFormatter={(value) => value ? value.split(' ')[0] : ''} 
                    />
                    <YAxis tick={{ fill: isDark ? '#94a3b8' : '#475569', fontSize: 10 }} />
                    <Tooltip content={<CustomChartTooltip isDark={isDark} />} />
                    {metricType === 'duration' ? (
                      <Bar name="Average Duration" dataKey="averageDays" fill="#1976d2" radius={[4, 4, 0, 0]}>
                        {companyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                      </Bar>
                    ) : (
                      <Bar name="Total Leaves" dataKey="totalLeaves" fill="#2e7d32" radius={[4, 4, 0, 0]}>
                        {companyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[(index + 2) % colors.length]} />
                        ))}
                      </Bar>
                    )}
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
              {metricType === 'duration' 
                ? 'Showing average duration (days) of leaves across companies' 
                : 'Showing total count of active and closed sick leaves'
              }
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* 2. By Department comparison */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Briefcase className="w-5 h-5 text-indigo-500" />
              <Typography variant="subtitle1" sx={{ fontWeight: '700' }}>By Department</Typography>
            </Box>
            <Box sx={{ height: 260, width: '100%', minWidth: 0, position: 'relative' }}>
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                  <BarChart
                    data={departmentData}
                    margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.06)' : '#f0f0f0'} />
                    <XAxis 
                      dataKey="department" 
                      tick={{ fill: isDark ? '#94a3b8' : '#475569', fontSize: 10 }}
                      tickFormatter={(value) => value ? (value.length > 8 ? value.substring(0, 8) + '.' : value) : ''} 
                    />
                    <YAxis tick={{ fill: isDark ? '#94a3b8' : '#475569', fontSize: 10 }} />
                    <Tooltip content={<CustomChartTooltip isDark={isDark} />} />
                    {metricType === 'duration' ? (
                      <Bar name="Average Duration" dataKey="averageDays" fill="#9c27b0" radius={[4, 4, 0, 0]}>
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[(index + 3) % colors.length]} />
                        ))}
                      </Bar>
                    ) : (
                      <Bar name="Total Leaves" dataKey="totalLeaves" fill="#ed6c02" radius={[4, 4, 0, 0]}>
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[(index + 5) % colors.length]} />
                        ))}
                      </Bar>
                    )}
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
              {metricType === 'duration' 
                ? 'Comparative duration (days) of absence periods by department' 
                : 'Incident frequency by corporate operational branch'
              }
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* 3. By Work Center Comparison */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <MapPin className="w-5 h-5 text-emerald-500" />
              <Typography variant="subtitle1" sx={{ fontWeight: '700' }}>By Work Center</Typography>
            </Box>
            <Box sx={{ height: 260, width: '100%', minWidth: 0, position: 'relative' }}>
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                  <BarChart
                    data={workCenterData}
                    margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.06)' : '#f0f0f0'} />
                    <XAxis 
                      dataKey="workCenter" 
                      tick={{ fill: isDark ? '#94a3b8' : '#475569', fontSize: 10 }}
                      tickFormatter={(v) => v ? v.split(' ')[0] : ''} 
                    />
                    <YAxis tick={{ fill: isDark ? '#94a3b8' : '#475569', fontSize: 10 }} />
                    <Tooltip content={<CustomChartTooltip isDark={isDark} />} />
                    {metricType === 'duration' ? (
                      <Bar name="Average Duration" dataKey="averageDays" fill="#2e7d32" radius={[4, 4, 0, 0]}>
                        {workCenterData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[(index + 1) % colors.length]} />
                        ))}
                      </Bar>
                    ) : (
                      <Bar name="Total Leaves" dataKey="totalLeaves" fill="#0288d1" radius={[4, 4, 0, 0]}>
                        {workCenterData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[(index + 4) % colors.length]} />
                        ))}
                      </Bar>
                    )}
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
              {metricType === 'duration' 
                ? 'Average absence severity by localized manufacturing/R&D center' 
                : 'Workday absence events localized by region/facilities'
              }
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
