import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import CustomChartTooltip from './CustomChartTooltip.jsx';

export default function LeaveTypesChart({ leaveTypeData, isMounted, isDark }) {
  return (
    <Card>
      <CardContent sx={{ pb: 3 }}>
        <Typography variant="subtitle1" color="text.primary" sx={{ mb: 2, fontWeight: '700' }}>
          Critical Leave Types: Average Duration vs Incident Counts
        </Typography>
        <Grid container spacing={4} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ height: 180, width: '100%', minWidth: 0, position: 'relative' }}>
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                  <BarChart
                    layout="vertical"
                    data={leaveTypeData}
                    margin={{ top: 5, right: 10, left: 35, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.06)' : '#f5f5f5'} />
                    <XAxis type="number" tick={{ fill: isDark ? '#94a3b8' : '#475569', fontSize: 10 }} />
                    <YAxis type="category" dataKey="name" tick={{ fill: isDark ? '#94a3b8' : '#475569', fontSize: 10 }} />
                    <Tooltip content={<CustomChartTooltip isDark={isDark} />} />
                    <Bar name="Avg Duration (Days)" dataKey="avgDuration" fill="#00bcd4" maxBarSize={25} radius={[0, 4, 4, 0]} />
                    <Bar name="Case Count" dataKey="count" fill="#ff9800" maxBarSize={25} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ pl: { md: 2 } }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                This comparative chart correlates the frequency of occurrences of each type of sick leave with its corresponding gravity.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {leaveTypeData.map((type, i) => (
                  <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.primary" sx={{ fontWeight: '600' }}>
                      {type.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>{type.count}</strong> absences • <strong>{type.avgDuration}d</strong> avg. duration
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
