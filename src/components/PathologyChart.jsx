import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { PieChart as PieIcon } from 'lucide-react';

export default function PathologyChart({ pathologyData, isMounted, colors }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <PieIcon className="w-5 h-5 text-amber-500" />
          <Typography variant="subtitle1" sx={{ fontWeight: '700' }}>
            Pathology Diagnosis Impact
          </Typography>
        </Box>
        <Box sx={{ height: 250, width: '100%', minWidth: 0, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isMounted && (
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <PieChart>
                <Pie
                  data={pathologyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="days"
                  nameKey="name"
                >
                  {pathologyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => {
                    const original = pathologyData.find(p => p.name === name);
                    return [`${value} Days Lost (${original?.count || 0} Cases)`, 'Impact'];
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Box>
        
        {/* Customized Legends for Pie Chart */}
        <Box sx={{ maxHeight: 110, overflowY: 'auto', px: 1, mt: 1 }}>
          <Grid container spacing={1}>
            {pathologyData.map((entry, index) => (
              <Grid size={6} key={index} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box 
                  sx={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    backgroundColor: colors[index % colors.length],
                    flexShrink: 0
                  }} 
                />
                <Typography variant="caption" noWrap sx={{ maxWidth: '90%', color: 'text.secondary' }}>
                  {entry.name} ({entry.days}d)
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
