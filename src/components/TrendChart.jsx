import React from 'react';
import { 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp } from 'lucide-react';
import CustomChartTooltip from './CustomChartTooltip.jsx';

export default function TrendChart({ monthlyTrendData, isMounted, isDark }) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <TrendingUp className="w-5 h-5 text-blue-500" />
          <Typography variant="subtitle1" sx={{ fontWeight: '700' }}>
            Monthly Chronological Trend (Incidents & Capacity Cost)
          </Typography>
        </Box>
        <Box sx={{ height: 320, width: '100%', minWidth: 0, position: 'relative' }}>
          {isMounted && (
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <ComposedChart
                data={monthlyTrendData}
                margin={{ top: 15, right: -5, left: -15, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.06)' : '#f0f0f0'} />
                <XAxis dataKey="month" tick={{ fill: isDark ? '#94a3b8' : '#475569', fontSize: 11 }} />
                <YAxis 
                  yAxisId="left" 
                  label={{ 
                    value: 'New Leaves', 
                    angle: -90, 
                    position: 'insideLeft', 
                    style: { fontSize: 10, fill: isDark ? '#cbd5e1' : '#333' } 
                  }} 
                  tick={{ fill: isDark ? '#94a3b8' : '#475569', fontSize: 10 }} 
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  label={{ 
                    value: 'Days Lost', 
                    angle: 90, 
                    position: 'insideRight', 
                    style: { fontSize: 10, fill: isDark ? '#cbd5e1' : '#333' } 
                  }} 
                  tick={{ fill: isDark ? '#94a3b8' : '#475569', fontSize: 10 }} 
                />
                <Tooltip content={<CustomChartTooltip isDark={isDark} />} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar yAxisId="left" name="Incident Count" dataKey="leavesCount" fill="#2196f3" radius={[4, 4, 0, 0]} maxBarSize={45} />
                <Line yAxisId="right" type="monotone" name="Days Lost Sum" dataKey="daysLost" stroke="#d32f2f" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
