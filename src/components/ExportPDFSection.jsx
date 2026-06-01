import React from 'react';
import { Box, Typography, Button, FormGroup, FormControlLabel, Checkbox, Grid } from '@mui/material';
import { FileText, Printer } from 'lucide-react';

export default function ExportPDFSection({
  includeKPIs,
  setIncludeKPIs,
  includeChartsSummary,
  setIncludeChartsSummary,
  includeTableElements,
  setIncludeTableElements,
  onPrintPDF
}) {
  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <FileText className="w-5 h-5 text-indigo-600" />
          <Typography variant="subtitle2" sx={{ fontWeight: '700', color: 'text.primary' }}>
            PDF Corporate Report PDF
          </Typography>
        </Box>
        
        <Box sx={{ mb: 2, flexGrow: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontSize: '13px', lineHeight: 1.5 }}>
            Compile a professional, print-optimized workforce presence analysis summary. Use the boxes below to choose elements:
          </Typography>
          
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox 
                  size="small" 
                  checked={includeKPIs} 
                  onChange={(e) => setIncludeKPIs(e.target.checked)} 
                />
              }
              label={<Typography sx={{ fontSize: '12px', fontWeight: '600' }}>Executive summary cards</Typography>}
              sx={{ my: -0.5 }}
            />
            <FormControlLabel
              control={
                <Checkbox 
                  size="small" 
                  checked={includeChartsSummary} 
                  onChange={(e) => setIncludeChartsSummary(e.target.checked)} 
                />
              }
              label={<Typography sx={{ fontSize: '12px', fontWeight: '600' }}>Pathology & type distribution metrics</Typography>}
              sx={{ my: -0.5 }}
            />
            <FormControlLabel
              control={
                <Checkbox 
                  size="small" 
                  checked={includeTableElements} 
                  onChange={(e) => setIncludeTableElements(e.target.checked)} 
                />
              }
              label={<Typography sx={{ fontSize: '12px', fontWeight: '600' }}>Complete absences registries list</Typography>}
              sx={{ my: -0.5 }}
            />
          </FormGroup>
        </Box>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={onPrintPDF}
          startIcon={<Printer className="w-4 h-4" />}
          sx={{ 
            mt: 'auto', 
            py: 1.2, 
            textTransform: 'none', 
            fontWeight: '700',
            borderRadius: '8px',
            boxShadow: '0 4px 12px 0 rgba(37,99,235,0.2)'
          }}
        >
          Generate PDF / Report
        </Button>
      </Box>
    </Grid>
  );
}
