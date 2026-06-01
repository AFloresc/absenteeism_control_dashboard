import React from 'react';
import { 
  Box, 
  Container, 
  Tabs, 
  Tab, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@mui/material';
import { LayoutDashboard, ClipboardList, Users } from 'lucide-react';
import { AVAILABLE_COMPANIES } from '../mockData.js';

export default function NavigationPanel({
  activeTab,
  onTabChange,
  globalCompany,
  onGlobalCompanyChange
}) {
  return (
    <Box sx={{ backgroundColor: 'background.paper', borderBottom: '1px solid rgba(0, 0, 0, 0.08)', mb: 4 }}>
      <Container 
        maxWidth="xl" 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: { xs: 'stretch', md: 'center' },
          gap: { xs: 1.5, md: 2 },
          pb: { xs: 2, md: 0 }
        }}
      >
        <Tabs 
          value={activeTab} 
          onChange={onTabChange} 
          aria-label="dashboard navigation tabs"
          textColor="primary"
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            '& .MuiTabs-scrollButtons.Mui-disabled': { opacity: 0.3 },
            '& .MuiTab-root': { 
              textTransform: 'none', 
              fontSize: { xs: '13px', sm: '14.5px' }, 
              fontWeight: '700', 
              minWidth: { xs: 80, sm: 120 },
              py: 2,
              px: { xs: 1.5, sm: 2 },
              display: 'inline-flex',
              flexDirection: 'row',
              gap: 1,
              alignItems: 'center'
            } 
          }}
        >
          <Tab id="nav-tab-analytics" icon={<LayoutDashboard className="w-4 h-4" />} label={<Box component="span">Analytics<Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}> Dashboard</Box></Box>} />
          <Tab id="nav-tab-cases" icon={<ClipboardList className="w-4 h-4" />} label={<Box component="span">Incidents<Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}> Registry</Box></Box>} />
          <Tab id="nav-tab-people" icon={<Users className="w-4 h-4" />} label={<Box component="span">Worker<Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}> Profiling</Box></Box>} />
        </Tabs>

        {/* Global Corporate Segment Selector dropdown */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: { xs: '100%', md: 260 }, py: { xs: 0, md: 1 } }}>
          <FormControl size="small" fullWidth sx={{ backgroundColor: 'background.paper', borderRadius: '8px' }}>
            <InputLabel id="global-company-filter-label" sx={{ fontSize: '13px', fontWeight: '600', color: 'text.secondary' }}>Company Filter (Global)</InputLabel>
            <Select
              labelId="global-company-filter-label"
              id="global-company-filter"
              value={globalCompany}
              label="Company Filter (Global)"
              onChange={(e) => onGlobalCompanyChange(e.target.value)}
              sx={{ 
                borderRadius: '8px',
                borderColor: 'divider',
                '& .MuiSelect-select': { 
                  py: '8px', 
                  fontSize: '13.5px', 
                  fontWeight: '700',
                  color: 'text.primary'
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'divider'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main'
                }
              }}
            >
              <MenuItem value="All" sx={{ fontSize: '13.5px', fontWeight: '700' }}>
                <em>All Companies</em>
              </MenuItem>
              {AVAILABLE_COMPANIES.map((c) => (
                <MenuItem key={c} value={c} sx={{ fontSize: '13.5px', fontWeight: '500' }}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Container>
    </Box>
  );
}
