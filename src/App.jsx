import React, { useState, useEffect } from 'react';
import { 
  ThemeProvider, 
  CssBaseline, 
  Box, 
  Container, 
  Typography,
  Snackbar, 
  Alert
} from '@mui/material';
import { INITIAL_SICK_LEAVES } from './mockData.js';
import { getCorporateTheme } from './theme.js';
import Header from './components/Header.jsx';
import KPICards from './components/KPICards.jsx';
import KPICharts from './components/KPICharts.jsx';
import SickLeaveTable from './components/SickLeaveTable.jsx';
import SickLeaveForm from './components/SickLeaveForm.jsx';
import PersonStats from './components/PersonStats.jsx';
import ExportDialog from './components/ExportDialog.jsx';

export default function App() {
  const [leaves, setLeaves] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [globalCompany, setGlobalCompany] = useState('All');
  
  // Theme Mode (Light / Dark) management
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('SICK_LEAVE_THEME_MODE') || 'light';
  });

  const activeTheme = React.useMemo(() => getCorporateTheme(themeMode), [themeMode]);

  const toggleThemeMode = () => {
    const nextMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(nextMode);
    localStorage.setItem('SICK_LEAVE_THEME_MODE', nextMode);
  };
  
  // Dialog management
  const [formOpen, setFormOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  
  // Notification alert toasts
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const filteredLeaves = globalCompany === 'All'
    ? leaves
    : leaves.filter(l => l.company === globalCompany);

  // Load from local storage or initialize with sample data
  useEffect(() => {
    const saved = localStorage.getItem('SICK_LEAVE_RECORDS');
    if (saved) {
      try {
        setLeaves(JSON.parse(saved));
      } catch (e) {
        setLeaves(INITIAL_SICK_LEAVES);
      }
    } else {
      setLeaves(INITIAL_SICK_LEAVES);
      localStorage.setItem('SICK_LEAVE_RECORDS', JSON.stringify(INITIAL_SICK_LEAVES));
    }
  }, []);

  // Sync state with localStorage on changes
  const saveToStorage = (updatedLeaves) => {
    setLeaves(updatedLeaves);
    localStorage.setItem('SICK_LEAVE_RECORDS', JSON.stringify(updatedLeaves));
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Add or Edit save callback
  const handleSaveLeave = (newOrEditedLeave) => {
    const exists = leaves.some(l => l.id === newOrEditedLeave.id);
    let updated;

    if (exists) {
      updated = leaves.map(l => l.id === newOrEditedLeave.id ? newOrEditedLeave : l);
      showToast('Sick leave record successfully updated.', 'success');
    } else {
      updated = [newOrEditedLeave, ...leaves];
      showToast('New sick leave incident registered inside system databases.', 'success');
    }
    
    saveToStorage(updated);
    setFormOpen(false);
    setSelectedLeave(null);
  };

  // Delete callback
  const handleDeleteLeave = (id) => {
    const updated = leaves.filter(l => l.id !== id);
    saveToStorage(updated);
    showToast('Record deleted permanently from company profiles.', 'error');
  };

  // Quick action: Close custom leave
  const handleCompleteLeave = (id, completionDate) => {
    const updated = leaves.map(l => {
      if (l.id === id) {
        return {
          ...l,
          endDate: completionDate,
          status: 'Completed'
        };
      }
      return l;
    });
    saveToStorage(updated);
    showToast('Leave completed. Worker absence state closed.', 'success');
  };

  const handleResetData = () => {
    saveToStorage(INITIAL_SICK_LEAVES);
    showToast('Mock records reset back to original demonstration parameters.', 'info');
  };

  const showToast = (message, severity) => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => {
    setToast(prev => ({ ...prev, open: false }));
  };

  const activeCasesCount = filteredLeaves.filter(l => l.status === 'Active').length;

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: 'background.default' }}>
        
        {/* Header containing AppBar and Tabs */}
        <Header
          themeMode={themeMode}
          toggleThemeMode={toggleThemeMode}
          globalCompany={globalCompany}
          onGlobalCompanyChange={setGlobalCompany}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          activeCasesCount={activeCasesCount}
          onResetData={handleResetData}
          onExportClick={() => setExportOpen(true)}
          onAddIncidentClick={() => {
            setSelectedLeave(null);
            setFormOpen(true);
          }}
        />

        {/* Core Contents container */}
        <Container maxWidth="xl" sx={{ pb: 6 }}>
          
          {/* TAB 0: Big Overview Analytics Dashboard */}
          {activeTab === 0 && (
            <Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" color="text.primary" sx={{ fontWeight: '800' }}>
                  Workforce Loss & Health KPI Analysis
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  High-level corporate segmentations metrics tracking active absences, sum of Days Lost and averages.
                </Typography>
              </Box>

              {/* KPICards Row */}
              <KPICards leaves={filteredLeaves} />

              {/* KPICharts Layout */}
              <KPICharts leaves={filteredLeaves} />
            </Box>
          )}

          {/* TAB 1: Data Table & Administrative Filters */}
          {activeTab === 1 && (
            <Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" color="text.primary" sx={{ fontWeight: '800' }}>
                  Sickness Incidents Log
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Complete historic registries database. Query, search, update clinical status, and register administrative entries.
                </Typography>
              </Box>

              <SickLeaveTable 
                leaves={leaves}
                globalCompany={globalCompany}
                onGlobalCompanyChange={setGlobalCompany}
                onEdit={(leave) => {
                  setSelectedLeave(leave);
                  setFormOpen(true);
                }}
                onDelete={handleDeleteLeave}
                onComplete={handleCompleteLeave}
                onAddTrigger={() => {
                  setSelectedLeave(null);
                  setFormOpen(true);
                }}
              />
            </Box>
          )}

          {/* TAB 2: Person stats profiling */}
          {activeTab === 2 && (
            <Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" color="text.primary" sx={{ fontWeight: '800' }}>
                  Employee Absenteeism Profiling
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Individual statistics identifying high-recurrence cases to trigger ergonomic checks and clinical adjustments.
                </Typography>
              </Box>

              <PersonStats leaves={filteredLeaves} />
            </Box>
          )}

        </Container>

        {/* Central Modal Form overlay for Add/Edit */}
        <SickLeaveForm 
          open={formOpen}
          leaveToEdit={selectedLeave}
          onClose={() => {
            setFormOpen(false);
            setSelectedLeave(null);
          }}
          onSave={handleSaveLeave}
        />

        {/* Export & Reports Hub dialog center */}
        <ExportDialog
          open={exportOpen}
          onClose={() => setExportOpen(false)}
          leaves={leaves}
          filteredLeaves={filteredLeaves}
          activeCompany={globalCompany}
        />

        {/* Notification Feedback Toast */}
        <Snackbar
          open={toast.open}
          autoHideDuration={4000}
          onClose={handleCloseToast}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleCloseToast} 
            severity={toast.severity} 
            variant="filled"
            sx={{ width: '100%', borderRadius: '8px', fontWeight: '500' }}
          >
            {toast.message}
          </Alert>
        </Snackbar>

      </Box>
    </ThemeProvider>
  );
}
