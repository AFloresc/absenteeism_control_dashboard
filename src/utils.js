// Anchor point for current date to ensure stable mock duration for active leaves
export const CURRENT_DATE_ANCHOR = '2026-05-27';

/**
 * Calculates the number of calendar days between two dates (inclusive)
 */
export function calculateDaysBetween(startDateStr, endDateStr) {
  const start = new Date(startDateStr);
  const end = endDateStr ? new Date(endDateStr) : new Date(CURRENT_DATE_ANCHOR);
  
  if (isNaN(start.getTime())) return 0;
  
  const diffTime = end.getTime() - start.getTime();
  if (diffTime < 0) return 0; // Negative dates check
  
  // Convert ms to days and add 1 to make it inclusive (e.g., May 10 to May 10 is 1 day)
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
}

/**
 * Aggregate metrics by Company
 */
export function calculateCompanyKPIs(leaves) {
  const map = {};
  
  leaves.forEach(l => {
    if (!map[l.company]) {
      map[l.company] = { total: 0, active: 0, days: 0 };
    }
    const days = calculateDaysBetween(l.startDate, l.endDate);
    map[l.company].total += 1;
    if (l.status === 'Active') {
      map[l.company].active += 1;
    }
    map[l.company].days += days;
  });
  
  return Object.entries(map).map(([companyName, value]) => ({
    companyName,
    totalLeaves: value.total,
    activeLeaves: value.active,
    totalDaysLost: value.days,
    averageDays: value.total > 0 ? parseFloat((value.days / value.total).toFixed(1)) : 0,
  }));
}

/**
 * Aggregate metrics by Department
 */
export function calculateDepartmentKPIs(leaves) {
  const map = {};
  
  leaves.forEach(l => {
    if (!map[l.department]) {
      map[l.department] = { total: 0, days: 0 };
    }
    const days = calculateDaysBetween(l.startDate, l.endDate);
    map[l.department].total += 1;
    map[l.department].days += days;
  });
  
  return Object.entries(map).map(([department, value]) => ({
    department,
    totalLeaves: value.total,
    totalDaysLost: value.days,
    averageDays: value.total > 0 ? parseFloat((value.days / value.total).toFixed(1)) : 0,
  }));
}

/**
 * Aggregate metrics by Work Center
 */
export function calculateWorkCenterKPIs(leaves) {
  const map = {};
  
  leaves.forEach(l => {
    if (!map[l.workCenter]) {
      map[l.workCenter] = { total: 0, days: 0 };
    }
    const days = calculateDaysBetween(l.startDate, l.endDate);
    map[l.workCenter].total += 1;
    map[l.workCenter].days += days;
  });
  
  return Object.entries(map).map(([workCenter, value]) => ({
    workCenter,
    totalLeaves: value.total,
    totalDaysLost: value.days,
    averageDays: value.total > 0 ? parseFloat((value.days / value.total).toFixed(1)) : 0,
  }));
}

/**
 * Aggregate metrics by Person
 */
export function calculatePersonKPIs(leaves) {
  const map = {};
  
  leaves.forEach(l => {
    const key = `${l.workerName}||${l.company}`;
    if (!map[key]) {
      map[key] = { company: l.company, count: 0, days: 0, leaves: [] };
    }
    const days = calculateDaysBetween(l.startDate, l.endDate);
    map[key].count += 1;
    map[key].days += days;
    map[key].leaves.push(l);
  });
  
  return Object.entries(map).map(([key, value]) => {
    const [workerName] = key.split('||');
    return {
      workerName,
      company: value.company,
      totalLeavesCount: value.count,
      totalDaysLost: value.days,
      averageDays: value.count > 0 ? parseFloat((value.days / value.count).toFixed(1)) : 0,
      bradfordIndex: value.count * value.count * value.days,
      leaves: value.leaves,
    };
  }).sort((a, b) => b.totalDaysLost - a.totalDaysLost); // Sort by highest gravity/impact
}

/**
 * Get distribution of Pathology
 */
export function getPathologyDistribution(leaves) {
  const map = {};
  
  leaves.forEach(l => {
    if (!map[l.pathology]) {
      map[l.pathology] = { count: 0, days: 0 };
    }
    const days = calculateDaysBetween(l.startDate, l.endDate);
    map[l.pathology].count += 1;
    map[l.pathology].days += days;
  });
  
  return Object.entries(map).map(([name, val]) => ({
    name,
    count: val.count,
    days: val.days,
    avgDuration: val.count > 0 ? parseFloat((val.days / val.count).toFixed(1)) : 0,
  }));
}

/**
 * Get monthly trend of leaves
 */
export function getMonthlyTrend(leaves) {
  const map = {};
  
  // We extract month from YYYY-MM-DD
  leaves.forEach(l => {
    // E.g. '2026-01'
    const monthKey = l.startDate.substring(0, 7);
    if (!map[monthKey]) {
      map[monthKey] = { count: 0, days: 0 };
    }
    const days = calculateDaysBetween(l.startDate, l.endDate);
    map[monthKey].count += 1;
    map[monthKey].days += days;
  });
  
  // Sort months chronologically
  return Object.entries(map)
    .map(([month, val]) => ({
      month, // e.g. "2026-01"
      leavesCount: val.count,
      daysLost: val.days,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

/**
 * Get distribution of Leave Types
 */
export function getLeaveTypeDistribution(leaves) {
  const map = {};
  
  leaves.forEach(l => {
    if (!map[l.leaveType]) {
      map[l.leaveType] = { count: 0, days: 0 };
    }
    const days = calculateDaysBetween(l.startDate, l.endDate);
    map[l.leaveType].count += 1;
    map[l.leaveType].days += days;
  });
  
  return Object.entries(map).map(([name, val]) => ({
    name,
    count: val.count,
    days: val.days,
    avgDuration: val.count > 0 ? parseFloat((val.days / val.count).toFixed(1)) : 0,
  }));
}

/**
 * Get sex distribution
 */
export function getSexDistribution(leaves) {
  const map = {
    Male: { count: 0, days: 0 },
    Female: { count: 0, days: 0 },
    Other: { count: 0, days: 0 },
  };
  
  leaves.forEach(l => {
    if (map[l.workerSex]) {
      map[l.workerSex].count += 1;
      map[l.workerSex].days += calculateDaysBetween(l.startDate, l.endDate);
    }
  });
  
  return Object.entries(map)
    .filter(([_, val]) => val.count > 0)
    .map(([name, val]) => ({
      name,
      count: val.count,
      days: val.days,
    }));
}

/**
 * Safely escape string for CSV inclusion
 */
function escapeCSVCell(val) {
  if (val === null || val === undefined) return '';
  const stringVal = String(val);
  // If value contains comma, quotes, or newlines, wrap in double quotes and escape existing quotes
  if (stringVal.includes(',') || stringVal.includes('"') || stringVal.includes('\n') || stringVal.includes('\r')) {
    return `"${stringVal.replace(/"/g, '""')}"`;
  }
  return stringVal;
}

/**
 * Generate CSV dataset representing sick leave incidents for Excel
 */
export function generateSickLeaveCSV(leaves) {
  const headers = [
    'Leave ID',
    'Worker Name',
    'Worker Email',
    'Worker Mobile',
    'Worker Sex',
    'Company',
    'Department',
    'Work Center',
    'Start Date',
    'End Date',
    'Days Duration',
    'Pathology Group',
    'Leave Type',
    'Status',
    'Clinical Notes'
  ];

  const rows = leaves.map(l => {
    const daysLost = calculateDaysBetween(l.startDate, l.endDate);
    return [
      l.id,
      l.workerName,
      l.workerEmail,
      l.workerMobile,
      l.workerSex,
      l.company,
      l.department,
      l.workCenter,
      l.startDate,
      l.endDate || 'Active / Ongoing',
      daysLost,
      l.pathology,
      l.leaveType,
      l.status,
      l.notes || ''
    ];
  });

  // Combine headers and rows with standard CRLF line breaks
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(escapeCSVCell).join(','))
  ].join('\r\n');

  // Add UTF-8 BOM so Excel opens it with correct encoding instantly
  return '\uFEFF' + csvContent;
}

/**
 * Triggers standard browser download for raw text data content
 */
export function triggerFileDownload(filename, content, mimeType = 'text/csv;charset=utf-8;') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

