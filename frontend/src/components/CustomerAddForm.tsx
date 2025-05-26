import { useState } from 'react';
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
  Stack,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import type { Customer } from '../mock/customers';

interface CustomerAddFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (customer: Omit<Customer, 'id' | 'uid'>) => void;
  initialData?: Customer;
}

export default function CustomerAddForm({ open, onClose, onSubmit, initialData }: CustomerAddFormProps) {
  const [formData, setFormData] = useState({
    memberId: '',
    name: '',
    gender: 'male' as 'male' | 'female' | 'other',
    birthDate: null as Date | null,
    phone: '',
    countryCode: '+886',
    email: '',
    address: '',
    socialMedia: {
      line: '',
      facebook: '',
      wechat: '',
      whatsapp: '',
    },
    joinDate: null as Date | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
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

  const handleSocialMediaChange = (platform: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: event.target.value,
      },
    }));
  };

  const handleDateChange = (field: string) => (date: Date | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: date,
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name) {
      newErrors.name = '請輸入姓名';
    }
    
    if (!formData.gender) {
      newErrors.gender = '請選擇性別';
    }
    
    if (!formData.birthDate) {
      newErrors.birthDate = '請選擇生日';
    }
    
    if (!formData.phone) {
      newErrors.phone = '請輸入電話';
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = '電話號碼只能包含數字';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '請輸入有效的電子信箱';
    }
    
    if (!formData.address) {
      newErrors.address = '請輸入地址';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    onSubmit({
      memberId: formData.memberId || null,
      name: formData.name,
      gender: formData.gender,
      birthDate: formData.birthDate?.toISOString().slice(0, 10) || '',
      phone: `${formData.countryCode}${formData.phone}`,
      email: formData.email || undefined,
      address: formData.address,
      socialMedia: {
        line: formData.socialMedia.line || undefined,
        facebook: formData.socialMedia.facebook || undefined,
        wechat: formData.socialMedia.wechat || undefined,
        whatsapp: formData.socialMedia.whatsapp || undefined,
      },
      joinDate: formData.joinDate?.toISOString().slice(0, 10),
    });
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {initialData ? '編輯客戶' : '新增客戶'}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
              <TextField
                fullWidth
                label="會員編號"
                value={formData.memberId}
                onChange={handleInputChange('memberId')}
                helperText="選填"
              />
            </Box>
            <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
              <TextField
                fullWidth
                required
                label="姓名"
                value={formData.name}
                onChange={handleInputChange('name')}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Box>
            <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
              <FormControl fullWidth required>
                <InputLabel>性別</InputLabel>
                <Select
                  value={formData.gender}
                  label="性別"
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      gender: e.target.value as 'male' | 'female' | 'other',
                    }));
                    if (errors.gender) {
                      setErrors(prev => ({
                        ...prev,
                        gender: '',
                      }));
                    }
                  }}
                  error={!!errors.gender}
                >
                  <MenuItem value="male">男</MenuItem>
                  <MenuItem value="female">女</MenuItem>
                  <MenuItem value="other">其他</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="生日"
                  value={formData.birthDate}
                  onChange={handleDateChange('birthDate')}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      error: !!errors.birthDate,
                      helperText: errors.birthDate,
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>
            <Box sx={{ flex: '1 1 100%', minWidth: 0 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl sx={{ width: '180px' }}>
                  <InputLabel>國碼</InputLabel>
                  <Select
                    value={formData.countryCode}
                    label="國碼"
                    onChange={(e) => {
                      setFormData(prev => ({
                        ...prev,
                        countryCode: e.target.value,
                      }));
                    }}
                  >
                    <MenuItem value="+886">台灣 (+886)</MenuItem>
                    <MenuItem value="+852">香港 (+852)</MenuItem>
                    <MenuItem value="+853">澳門 (+853)</MenuItem>
                    <MenuItem value="+86">中國 (+86)</MenuItem>
                    <MenuItem value="+81">日本 (+81)</MenuItem>
                    <MenuItem value="+82">韓國 (+82)</MenuItem>
                    <MenuItem value="+65">新加坡 (+65)</MenuItem>
                    <MenuItem value="+60">馬來西亞 (+60)</MenuItem>
                    <MenuItem value="+66">泰國 (+66)</MenuItem>
                    <MenuItem value="+84">越南 (+84)</MenuItem>
                    <MenuItem value="+62">印尼 (+62)</MenuItem>
                    <MenuItem value="+63">菲律賓 (+63)</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  sx={{ width: 'calc(100% - 200px)' }}
                  required
                  label="電話"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </Box>
            </Box>
            <Box sx={{ flex: '1 1 100%', minWidth: 0 }}>
              <TextField
                fullWidth
                label="電子信箱"
                value={formData.email}
                onChange={handleInputChange('email')}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Box>
            <Box sx={{ flex: '1 1 100%', minWidth: 0 }}>
              <TextField
                fullWidth
                required
                label="地址"
                value={formData.address}
                onChange={handleInputChange('address')}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Box>
          </Box>

          <Typography variant="h6" sx={{ mt: 2 }}>
            通訊軟體
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
              <TextField
                fullWidth
                label="Line"
                value={formData.socialMedia.line || ''}
                onChange={handleSocialMediaChange('line')}
              />
            </Box>
            <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
              <TextField
                fullWidth
                label="Facebook"
                value={formData.socialMedia.facebook || ''}
                onChange={handleSocialMediaChange('facebook')}
              />
            </Box>
            <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
              <TextField
                fullWidth
                label="WeChat"
                value={formData.socialMedia.wechat || ''}
                onChange={handleSocialMediaChange('wechat')}
              />
            </Box>
            <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
              <TextField
                fullWidth
                label="WhatsApp"
                value={formData.socialMedia.whatsapp || ''}
                onChange={handleSocialMediaChange('whatsapp')}
              />
            </Box>
          </Box>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="加入時間"
              value={formData.joinDate}
              onChange={handleDateChange('joinDate')}
              slotProps={{
                textField: {
                  fullWidth: true,
                  helperText: '選填',
                },
              }}
            />
          </LocalizationProvider>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          確定
        </Button>
      </DialogActions>
    </Dialog>
  );
} 