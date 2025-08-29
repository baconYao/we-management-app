import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Stack,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import type { WaterPurifier } from '../mock/customers';

interface PurifierAddFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (purifier: Omit<WaterPurifier, 'maintenanceRecords'>) => void;
}

export default function PurifierAddForm({ open, onClose, onSubmit }: PurifierAddFormProps) {
  const [formData, setFormData] = useState({
    serialNumber: '',
    model: '',
    installationDate: null as Date | null,
    installationPerson: '',
    location: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({
      ...prev,
      installationDate: date,
    }));
    if (errors.installationDate) {
      setErrors(prev => ({
        ...prev,
        installationDate: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.serialNumber) {
      newErrors.serialNumber = '請輸入水機號碼';
    }
    
    if (!formData.model) {
      newErrors.model = '請輸入型號';
    }
    
    if (!formData.installationDate) {
      newErrors.installationDate = '請選擇裝機時間';
    }
    
    if (!formData.installationPerson) {
      newErrors.installationPerson = '請輸入裝機人員';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    onSubmit({
      serialNumber: formData.serialNumber,
      model: formData.model,
      installationDate: formData.installationDate?.toISOString().slice(0, 10) || '',
      installationPerson: formData.installationPerson,
      location: formData.location,
    });

    // 重置表單
    setFormData({
      serialNumber: '',
      model: '',
      installationDate: null,
      installationPerson: '',
      location: '',
    });
    setErrors({});
  };

  const handleClose = () => {
    // 重置表單
    setFormData({
      serialNumber: '',
      model: '',
      installationDate: null,
      installationPerson: '',
      location: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>新增淨水器</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="水機號碼"
              value={formData.serialNumber}
              onChange={handleInputChange('serialNumber')}
              required
              error={!!errors.serialNumber}
              helperText={errors.serialNumber}
            />
            <TextField
              fullWidth
              label="型號"
              value={formData.model}
              onChange={handleInputChange('model')}
              required
              error={!!errors.model}
              helperText={errors.model}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="裝機時間"
                value={formData.installationDate}
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    error: !!errors.installationDate,
                    helperText: errors.installationDate,
                  },
                }}
              />
            </LocalizationProvider>
            <TextField
              fullWidth
              label="裝機人員"
              value={formData.installationPerson}
              onChange={handleInputChange('installationPerson')}
              required
              error={!!errors.installationPerson}
              helperText={errors.installationPerson}
            />
            <TextField
              fullWidth
              label="擺放位置 (選填)"
              value={formData.location}
              onChange={handleInputChange('location')}
              placeholder="請輸入擺放位置"
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>取消</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={!formData.serialNumber || !formData.model || !formData.installationDate || !formData.installationPerson}
        >
          新增
        </Button>
      </DialogActions>
    </Dialog>
  );
}
