import React from 'react';
import { AppBar, Toolbar, Container } from '@mui/material';
import BrandSection from './BrandSection.jsx';
import ActionButtons from './ActionButtons.jsx';
import NavigationPanel from './NavigationPanel.jsx';

export default function Header({
  themeMode,
  toggleThemeMode,
  globalCompany,
  onGlobalCompanyChange,
  activeTab,
  onTabChange,
  activeCasesCount,
  onResetData,
  onExportClick,
  onAddIncidentClick
}) {
  return (
    <>
      {/* Top App Header with styling */}
      <AppBar 
        position="sticky" 
        elevation={0} 
        color="inherit"
        sx={{ 
          backgroundColor: 'background.paper', 
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          backgroundImage: 'none'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar 
            sx={{ 
              px: '0 !important', 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' }, 
              alignItems: { xs: 'stretch', md: 'center' }, 
              py: { xs: 1.5, md: 1 }, 
              gap: { xs: 1.5, md: 2 } 
            }}
          >
            <BrandSection 
              themeMode={themeMode} 
              toggleThemeMode={toggleThemeMode} 
            />

            <ActionButtons 
              themeMode={themeMode}
              toggleThemeMode={toggleThemeMode}
              globalCompany={globalCompany}
              activeCasesCount={activeCasesCount}
              onResetData={onResetData}
              onExportClick={onExportClick}
              onAddIncidentClick={onAddIncidentClick}
            />
          </Toolbar>
        </Container>
      </AppBar>

      {/* Navigation tab bar & company selector */}
      <NavigationPanel 
        activeTab={activeTab}
        onTabChange={onTabChange}
        globalCompany={globalCompany}
        onGlobalCompanyChange={onGlobalCompanyChange}
      />
    </>
  );
}

