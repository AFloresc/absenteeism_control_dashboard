import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { FileSpreadsheet, Download } from 'lucide-react';

export default function ExportExcelSection({ targetRecordsCount, onExcelExport }) {
  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
          <Typography variant="subtitle2" sx={{ fontWeight: '700', color: 'text.primary' }}>
            Excel / Spreadsheet Export
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, flexGrow: 1, fontSize: '13px', lineHeight: 1.5 }}>
          Generates a clean Microsoft Excel compatible spreadsheet containing all details of <strong>{targetRecordsCount} records</strong>. Includes date parameters, total calculated work days lost, worker metadata, and diagnostic groups.
        </Typography>

        <Button
          fullWidth
          variant="outlined"
          color="success"
          onClick={onExcelExport}
          startIcon={<Download className="w-4 h-4" />}
          sx={{ 
            mt: 'auto', 
            py: 1, 
            textTransform: 'none', 
            fontWeight: '700',
            borderColor: 'success.main',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: 'success.light',
              borderColor: 'success.main'
            }
          }}
        >
          Download Excel (CSV)
        </Button>
      </Box>
    </Grid>
  );
}
