import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Box, 
  Typography, 
  Grid, 
  Divider, 
  IconButton
} from '@mui/material';
import { X, Download, Info } from 'lucide-react';
import { generateSickLeaveCSV, triggerFileDownload } from '../utils.js';
import PrintableReport from './PrintableReport.jsx';
import ExportDatasetScope from './ExportDatasetScope.jsx';
import ExportExcelSection from './ExportExcelSection.jsx';
import ExportPDFSection from './ExportPDFSection.jsx';

export default function ExportDialog({ 
  open, 
  onClose, 
  leaves, 
  filteredLeaves, 
  activeCompany 
}) {
  const [exportScope, setExportScope] = useState('filtered'); // 'filtered' or 'all'
  const [includeKPIs, setIncludeKPIs] = useState(true);
  const [includeChartsSummary, setIncludeChartsSummary] = useState(true);
  const [includeTableElements, setIncludeTableElements] = useState(true);

  // Determine current active records based on selected scope
  const targetRecords = exportScope === 'filtered' ? filteredLeaves : leaves;

  const handleExcelExport = () => {
    const csvContent = generateSickLeaveCSV(targetRecords);
    const filename = `SanaCorp_Sick_Leaves_${exportScope === 'filtered' ? activeCompany.replace(/\s+/g, '_') : 'All_Companies'}_${new Date().toISOString().split('T')[0]}.csv`;
    triggerFileDownload(filename, csvContent);
  };

  const handleJsonExport = () => {
    const jsonContent = JSON.stringify(targetRecords, null, 2);
    const filename = `SanaCorp_Sick_Leaves_${exportScope === 'filtered' ? activeCompany.replace(/\s+/g, '_') : 'All_Companies'}_${new Date().toISOString().split('T')[0]}.json`;
    triggerFileDownload(filename, jsonContent, 'application/json;charset=utf-8;');
  };

  const handlePrintPDF = () => {
    // Generate active session print trigger
    window.print();
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)' }
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ p: 1, backgroundColor: 'primary.light', borderRadius: '8px', color: 'primary.main', display: 'flex' }}>
              <Download className="w-5 h-5" />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: '800', lineHeight: 1.2 }}>
                Export & Reports Hub
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: '600' }}>
                Download structured spreadsheets, JSON datasets, or compile high-density PDF reports
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
            <X className="w-5 h-5" />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          {/* Scope selection */}
          <ExportDatasetScope 
            exportScope={exportScope}
            setExportScope={setExportScope}
            activeCompany={activeCompany}
            filteredLeavesCount={filteredLeaves.length}
            totalLeavesCount={leaves.length}
          />

          <Divider sx={{ my: 3 }} />

          {/* Action grid */}
          <Grid container spacing={3.5}>
            {/* Excel & JSON Column */}
            <ExportExcelSection 
              targetRecordsCount={targetRecords.length}
              onExcelExport={handleExcelExport}
              onJsonExport={handleJsonExport}
            />

            {/* Splitter border inside custom dialog */}
            <Box sx={{ display: { xs: 'none', sm: 'block' }, width: '1px', backgroundColor: 'rgba(0,0,0,0.08)', my: 2, mr: -0.1 }} />

            {/* PDF Column */}
            <ExportPDFSection 
              includeKPIs={includeKPIs}
              setIncludeKPIs={setIncludeKPIs}
              includeChartsSummary={includeChartsSummary}
              setIncludeChartsSummary={setIncludeChartsSummary}
              includeTableElements={includeTableElements}
              setIncludeTableElements={setIncludeTableElements}
              onPrintPDF={handlePrintPDF}
            />
          </Grid>

          {/* Quick notice block */}
          <Box sx={{ mt: 3, display: 'flex', gap: 1, p: 1.5, backgroundColor: 'grey.50', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.04)' }}>
            <Info className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: '500', lineHeight: 1.4 }}>
              <strong>Tip:</strong> The PDF generator relies on your browser's print utility. When the print preview loads, select <strong>"Save as PDF"</strong> as your destination to save it as a PDF report locally on your machine.
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(0,0,0,0.06)', backgroundColor: '#f8fafc' }}>
          <Button onClick={onClose} variant="outlined" color="inherit" sx={{ textTransform: 'none', fontWeight: '600', borderColor: 'rgba(0,0,0,0.15)' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* DEDICATED PRINTABLE REPORT ELEMENT (HIDDEN ON SCREEN, RE-RENDERED IN PRINT PREVIEW MODE ONLY) */}
      <PrintableReport
        targetRecords={targetRecords}
        exportScope={exportScope}
        activeCompany={activeCompany}
        includeKPIs={includeKPIs}
        includeChartsSummary={includeChartsSummary}
        includeTableElements={includeTableElements}
      />
    </>
  );
}
