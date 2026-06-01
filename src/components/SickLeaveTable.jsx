import React, { useState } from 'react';
import { Box } from '@mui/material';
import SickLeaveFilters from './SickLeaveFilters.jsx';
import SickLeaveDesktopTable from './SickLeaveDesktopTable.jsx';
import SickLeaveMobileList from './SickLeaveMobileList.jsx';

export default function SickLeaveTable({ 
  leaves, onEdit, onDelete, onComplete, onAddTrigger,
  globalCompany = 'All', onGlobalCompanyChange
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [localFilterCompany, setLocalFilterCompany] = useState('All');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [filterWorkCenter, setFilterWorkCenter] = useState('All');
  const [filterPathology, setFilterPathology] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filterCompany = onGlobalCompanyChange ? globalCompany : localFilterCompany;
  const setFilterCompany = onGlobalCompanyChange || setLocalFilterCompany;
  
  const [expandedId, setExpandedId] = useState(null);

  const filteredLeaves = leaves.filter(l => {
    const matchesSearch = 
      l.workerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.workerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.notes?.toLowerCase() || '').includes(searchTerm.toLowerCase());

    const matchesCompany = filterCompany === 'All' || l.company === filterCompany;
    const matchesDept = filterDepartment === 'All' || l.department === filterDepartment;
    const matchesWorkCenter = filterWorkCenter === 'All' || l.workCenter === filterWorkCenter;
    const matchesPathology = filterPathology === 'All' || l.pathology === filterPathology;
    const matchesStatus = filterStatus === 'All' || l.status === filterStatus;

    return matchesSearch && matchesCompany && matchesDept && matchesWorkCenter && matchesPathology && matchesStatus;
  }).sort((a, b) => b.startDate.localeCompare(a.startDate));

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterCompany('All');
    setFilterDepartment('All');
    setFilterWorkCenter('All');
    setFilterPathology('All');
    setFilterStatus('All');
  };

  const hasActiveFilters = searchTerm !== '' || filterCompany !== 'All' || filterDepartment !== 'All' || filterWorkCenter !== 'All' || filterPathology !== 'All' || filterStatus !== 'All';

  return (
    <Box sx={{ width: '100%' }}>
      <SickLeaveFilters
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        filterCompany={filterCompany} setFilterCompany={setFilterCompany}
        filterDepartment={filterDepartment} setFilterDepartment={setFilterDepartment}
        filterWorkCenter={filterWorkCenter} setFilterWorkCenter={setFilterWorkCenter}
        filterPathology={filterPathology} setFilterPathology={setFilterPathology}
        filterStatus={filterStatus} setFilterStatus={setFilterStatus}
        hasActiveFilters={hasActiveFilters} handleClearFilters={handleClearFilters} onAddTrigger={onAddTrigger}
      />
      <SickLeaveDesktopTable
        filteredLeaves={filteredLeaves} expandedId={expandedId} handleRowExpand={(id) => setExpandedId(expandedId === id ? null : id)}
        hasActiveFilters={hasActiveFilters} handleClearFilters={handleClearFilters} onComplete={onComplete} onEdit={onEdit} onDelete={onDelete}
      />
      <SickLeaveMobileList
        filteredLeaves={filteredLeaves} expandedId={expandedId} handleRowExpand={(id) => setExpandedId(expandedId === id ? null : id)}
        onComplete={onComplete} onEdit={onEdit} onDelete={onDelete}
      />
    </Box>
  );
}
