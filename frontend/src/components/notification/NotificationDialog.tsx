import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,

} from '@mui/material';
import { NotificationRecord } from '../../models/Notification';

interface NotificationDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (notification: Omit<NotificationRecord, 'id' | 'date'>) => void;
  customerName: string;
}

export default function NotificationDialog({ 
  open, 
  onClose, 
  onSubmit, 
  customerName 
}: NotificationDialogProps) {
  const [formData, setFormData] = useState({
    method: '電話' as '電話' | 'Line' | 'Wechat',
    notes: '',
  });

  const handleSubmit = () => {
    if (formData.notes.trim()) {
      onSubmit(formData);
      setFormData({ method: '電話', notes: '' });
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({ method: '電話', notes: '' });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        新增通知記錄 - {customerName}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>告知方式</InputLabel>
            <Select
              value={formData.method}
              label="告知方式"
              onChange={(e) => setFormData({ 
                ...formData, 
                method: e.target.value as '電話' | 'Line' | 'Wechat' 
              })}
            >
              <MenuItem value="電話">電話</MenuItem>
              <MenuItem value="Line">Line</MenuItem>
              <MenuItem value="Wechat">Wechat</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            label="紀錄 (100字內)"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            margin="normal"
            multiline
            rows={4}
            inputProps={{ maxLength: 100 }}
            helperText={`${formData.notes.length}/100`}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>取消</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          disabled={!formData.notes.trim()}
        >
          新增
        </Button>
      </DialogActions>
    </Dialog>
  );
}
