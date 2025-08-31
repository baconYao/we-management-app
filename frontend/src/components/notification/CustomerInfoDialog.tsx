import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Grid,
} from '@mui/material';
import { CustomerInfo } from '../../models/Notification';

interface CustomerInfoDialogProps {
  open: boolean;
  onClose: () => void;
  customer: CustomerInfo | null;
}

export default function CustomerInfoDialog({ open, onClose, customer }: CustomerInfoDialogProps) {
  if (!customer) return null;

  const isNonMember = customer.memberId === "非會員";

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          客戶資訊 - {customer.name}
          {isNonMember && (
            <Chip 
              label="非會員" 
              color="warning" 
              size="small" 
              variant="outlined"
            />
          )}
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                會員編號
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {isNonMember ? "非會員" : customer.memberId}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                姓名
              </Typography>
              <Typography variant="body1">
                {customer.name}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                電話
              </Typography>
              <Typography variant="body1">
                {customer.phone}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                電子郵件
              </Typography>
              <Typography variant="body1">
                {customer.email || "未提供"}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                地址
              </Typography>
              <Typography variant="body1">
                {customer.address}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                機器型號
              </Typography>
              <Typography variant="body1">
                {customer.machineModel}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                安裝日期
              </Typography>
              <Typography variant="body1">
                {customer.installDate.toLocaleDateString()}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        {isNonMember && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
            <Typography variant="body2" color="warning.dark">
              ⚠️ 此客戶目前為非會員狀態，建議邀請其加入會員以獲得更好的服務體驗。
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>關閉</Button>
      </DialogActions>
    </Dialog>
  );
}
