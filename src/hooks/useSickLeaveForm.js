import { useState, useEffect } from 'react';
import { 
  AVAILABLE_COMPANIES, 
  AVAILABLE_DEPARTMENTS, 
  AVAILABLE_WORK_CENTERS, 
  AVAILABLE_PATHOLOGIES, 
  AVAILABLE_LEAVE_TYPES 
} from '../mockData.js';

export const initialFormState = {
  workerName: '',
  workerEmail: '',
  workerMobile: '',
  workerSex: 'Male',
  company: AVAILABLE_COMPANIES[0],
  department: AVAILABLE_DEPARTMENTS[0],
  workCenter: AVAILABLE_WORK_CENTERS[0],
  startDate: new Date().toISOString().split('T')[0],
  endDate: '',
  pathology: AVAILABLE_PATHOLOGIES[0],
  leaveType: AVAILABLE_LEAVE_TYPES[0],
  status: 'Active',
  notes: '',
};

export default function useSickLeaveForm({ open, onClose, onSave, leaveToEdit }) {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (leaveToEdit) {
      setFormData({
        workerName: leaveToEdit.workerName || '',
        workerEmail: leaveToEdit.workerEmail || '',
        workerMobile: leaveToEdit.workerMobile || '',
        workerSex: leaveToEdit.workerSex || 'Male',
        company: leaveToEdit.company || AVAILABLE_COMPANIES[0],
        department: leaveToEdit.department || AVAILABLE_DEPARTMENTS[0],
        workCenter: leaveToEdit.workCenter || AVAILABLE_WORK_CENTERS[0],
        startDate: leaveToEdit.startDate || '',
        endDate: leaveToEdit.endDate || '',
        pathology: leaveToEdit.pathology || AVAILABLE_PATHOLOGIES[0],
        leaveType: leaveToEdit.leaveType || AVAILABLE_LEAVE_TYPES[0],
        status: leaveToEdit.status || 'Active',
        notes: leaveToEdit.notes || '',
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [leaveToEdit, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      // If status changes to Active, clear end date
      if (name === 'status' && value === 'Active') {
        updated.endDate = '';
      }
      // If status changes to Completed, and no end date, set current date as default
      if (name === 'status' && value === 'Completed' && !prev.endDate) {
        updated.endDate = prev.startDate || new Date().toISOString().split('T')[0];
      }
      return updated;
    });

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.workerName.trim()) {
      newErrors.workerName = 'Worker name is required';
    }

    if (!formData.workerEmail.trim()) {
      newErrors.workerEmail = 'Worker email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workerEmail)) {
      newErrors.workerEmail = 'Invalid email format';
    }

    if (!formData.workerMobile.trim()) {
      newErrors.workerMobile = 'Mobile number is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (formData.status === 'Completed') {
      if (!formData.endDate) {
        newErrors.endDate = 'End date is required for completed status';
      } else if (new Date(formData.endDate) < new Date(formData.startDate)) {
        newErrors.endDate = 'End date cannot be prior to start date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const finalLeave = {
      id: leaveToEdit ? leaveToEdit.id : `SL-${Math.floor(1000 + Math.random() * 9000)}`,
      workerName: formData.workerName.trim(),
      workerEmail: formData.workerEmail.trim(),
      workerMobile: formData.workerMobile.trim(),
      workerSex: formData.workerSex,
      company: formData.company,
      department: formData.department,
      workCenter: formData.workCenter,
      startDate: formData.startDate,
      endDate: formData.status === 'Completed' ? formData.endDate : null,
      pathology: formData.pathology,
      leaveType: formData.leaveType,
      status: formData.status,
      notes: formData.notes.trim() || undefined,
    };

    onSave(finalLeave);
  };

  return {
    formData,
    errors,
    handleChange,
    handleSelectChange,
    handleSubmit
  };
}
