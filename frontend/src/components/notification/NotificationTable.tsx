import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Notifications as NotificationsIcon,
  Info as InfoIcon,
  Build as BuildIcon,
} from '@mui/icons-material';
import { MaintenanceRecord, CustomerInfo, NotificationRecord } from '../../models/Notification';
import { useState } from 'react';
import NotificationHistoryDialog from './NotificationHistoryDialog';

interface NotificationTableProps {
  notifications: MaintenanceRecord[];
  customers: CustomerInfo[];
  onCompleteReplacement: (notificationId: string) => void;
  onAddNotification: (notificationId: string, notification: any) => void;
  onShowCustomerInfo: (customer: CustomerInfo) => void;
}

export default function NotificationTable({
  notifications,
  customers,
  onCompleteReplacement,
  onAddNotification,
  onShowCustomerInfo,
}: NotificationTableProps) {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState<string>('');
  const [replacementNotes, setReplacementNotes] = useState('');
  const [notificationHistoryDialogOpen, setNotificationHistoryDialogOpen] = useState(false);
  const [selectedNotificationHistory, setSelectedNotificationHistory] = useState<NotificationRecord[]>([]);
  const [selectedCustomerName, setSelectedCustomerName] = useState<string>('');

  const getCustomerInfo = (memberId: string) => {
    return customers.find(customer => customer.memberId === memberId);
  };

  const handleCompleteReplacement = (notificationId: string) => {
    setSelectedNotificationId(notificationId);
    setReplacementNotes('');
    setConfirmDialogOpen(true);
  };

  const handleConfirmReplacement = () => {
    if (selectedNotificationId) {
      onCompleteReplacement(selectedNotificationId);
      setConfirmDialogOpen(false);
      setSelectedNotificationId('');
      setReplacementNotes('');
    }
  };

  const handleCancelReplacement = () => {
    setConfirmDialogOpen(false);
    setSelectedNotificationId('');
    setReplacementNotes('');
  };

  const handleShowNotificationHistory = (notificationHistory: NotificationRecord[], customerName: string) => {
    setSelectedNotificationHistory(notificationHistory);
    setSelectedCustomerName(customerName);
    setNotificationHistoryDialogOpen(true);
  };

  const handleCloseNotificationHistory = () => {
    setNotificationHistoryDialogOpen(false);
    setSelectedNotificationHistory([]);
    setSelectedCustomerName('');
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>通知單號</TableCell>
              <TableCell>水機編號</TableCell>
              <TableCell>姓名 (會員編號)</TableCell>
              <TableCell>該換的耗材</TableCell>
              <TableCell>到期日期</TableCell>
              <TableCell>通知紀錄</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map((notification) => {
              const customer = getCustomerInfo(notification.memberId);
              return (
                <TableRow key={notification.notificationId}>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {notification.notificationId}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">
                      {notification.machineId}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => customer && onShowCustomerInfo(customer)}
                        sx={{ textTransform: 'none', p: 0, minWidth: 'auto' }}
                      >
                        {notification.customerName}
                      </Button>
                      <Typography
                        variant="caption"
                        color={notification.memberId === "非會員" ? "warning.main" : "text.secondary"}
                        sx={{
                          fontStyle: notification.memberId === "非會員" ? 'italic' : 'normal',
                          fontWeight: notification.memberId === "非會員" ? 'bold' : 'normal'
                        }}
                      >
                        ({notification.memberId})
                        {notification.memberId === "非會員" && ' - 非會員'}
                      </Typography>
                      <Tooltip title="查看客戶資訊">
                        <IconButton
                          size="small"
                          onClick={() => customer && onShowCustomerInfo(customer)}
                        >
                          <InfoIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      {notification.consumableParts.map((part, index) => (
                        <Chip
                          key={index}
                          label={part}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">
                      {notification.lastReplacementDate.toLocaleDateString()}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      {notification.notificationHistory.length > 0 ? (
                        notification.notificationHistory.map((record, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              cursor: 'pointer',
                              '&:hover': {
                                bgcolor: 'action.hover',
                                borderRadius: 1,
                                px: 1,
                                py: 0.5,
                              }
                            }}
                            onClick={() => handleShowNotificationHistory(notification.notificationHistory, notification.customerName)}
                          >
                            <Chip
                              label={record.method}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                            <Typography variant="caption" color="text.secondary">
                              {record.date.toLocaleDateString()}
                            </Typography>
                          </Box>
                        ))
                      ) : (
                        <Typography variant="caption" color="error">
                          無通知紀錄
                        </Typography>
                      )}
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="新增通知">
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => onAddNotification(notification.notificationId, {})}
                        >
                          <NotificationsIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="完成更換">
                        <IconButton
                          color="success"
                          size="small"
                          onClick={() => handleCompleteReplacement(notification.notificationId)}
                        >
                          <BuildIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 完成更換確認對話框 */}
      <Dialog
        open={confirmDialogOpen}
        onClose={handleCancelReplacement}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleIcon color="success" />
            確認完成更換
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            請確認已完成耗材更換，並填寫相關備註（選填）：
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="更換備註"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={replacementNotes}
            onChange={(e) => setReplacementNotes(e.target.value)}
            inputProps={{ maxLength: 100 }}
            helperText={`${replacementNotes.length}/100`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelReplacement} color="inherit">
            取消
          </Button>
          <Button
            onClick={handleConfirmReplacement}
            color="success"
            variant="contained"
            startIcon={<CheckCircleIcon />}
          >
            確定更換完成
          </Button>
        </DialogActions>
      </Dialog>

      {/* 通知歷史記錄對話框 */}
      <NotificationHistoryDialog
        open={notificationHistoryDialogOpen}
        onClose={handleCloseNotificationHistory}
        notificationHistory={selectedNotificationHistory}
        customerName={selectedCustomerName}
      />
    </>
  );
}
