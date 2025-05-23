import { useState } from 'react';
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  IconButton,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import Layout from '../components/Layout';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  date: string;
  status: 'read' | 'unread';
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: '系統更新通知',
    message: '系統將於今晚進行例行維護，預計停機時間為 2 小時。',
    type: 'info',
    date: '2024-03-20 10:00',
    status: 'unread',
  },
  {
    id: 2,
    title: '新訂單提醒',
    message: '您有一個新的訂單需要處理。',
    type: 'warning',
    date: '2024-03-20 09:30',
    status: 'unread',
  },
  {
    id: 3,
    title: '系統錯誤',
    message: '檢測到系統異常，請聯繫技術支持。',
    type: 'error',
    date: '2024-03-20 09:00',
    status: 'read',
  },
];

const getIconColor = (type: Notification['type']) => {
  switch (type) {
    case 'info':
      return 'info';
    case 'warning':
      return 'warning';
    case 'error':
      return 'error';
    case 'success':
      return 'success';
    default:
      return 'inherit';
  }
};

const getChipColor = (type: Notification['type']) => {
  switch (type) {
    case 'info':
      return 'info';
    case 'warning':
      return 'warning';
    case 'error':
      return 'error';
    case 'success':
      return 'success';
    default:
      return 'default';
  }
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [open, setOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'info' as Notification['type'],
  });

  const handleOpen = (notification?: Notification) => {
    if (notification) {
      setSelectedNotification(notification);
      setFormData({
        title: notification.title,
        message: notification.message,
        type: notification.type,
      });
    } else {
      setSelectedNotification(null);
      setFormData({
        title: '',
        message: '',
        type: 'info',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNotification(null);
  };

  const handleSubmit = () => {
    if (selectedNotification) {
      // 更新現有通知
      setNotifications(notifications.map(notification =>
        notification.id === selectedNotification.id
          ? { ...notification, ...formData }
          : notification
      ));
    } else {
      // 添加新通知
      const newNotification = {
        id: Math.max(...notifications.map(n => n.id)) + 1,
        ...formData,
        date: new Date().toLocaleString(),
        status: 'unread' as const,
      };
      setNotifications([newNotification, ...notifications]);
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === id
        ? { ...notification, status: 'read' as const }
        : notification
    ));
  };

  return (
    <Layout title="事件通知">
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
        >
          新增通知
        </Button>
      </Box>

      <Paper>
        <List>
          {notifications.map((notification) => (
            <ListItem
              key={notification.id}
              secondaryAction={
                <Box>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleOpen(notification)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(notification.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
              sx={{
                bgcolor: notification.status === 'unread' ? 'action.hover' : 'inherit',
                '&:hover': {
                  bgcolor: 'action.selected',
                },
              }}
              onClick={() => handleMarkAsRead(notification.id)}
            >
              <ListItemIcon>
                <NotificationsIcon color={getIconColor(notification.type)} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1">
                      {notification.title}
                    </Typography>
                    <Chip
                      label={notification.type}
                      size="small"
                      color={getChipColor(notification.type)}
                    />
                    {notification.status === 'unread' && (
                      <Chip
                        label="未讀"
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                  </Box>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {notification.date}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedNotification ? '編輯通知' : '新增通知'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="標題"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="內容"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              margin="normal"
              multiline
              rows={4}
            />
            <TextField
              fullWidth
              select
              label="類型"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as Notification['type'] })}
              margin="normal"
            >
              <MenuItem value="info">一般資訊</MenuItem>
              <MenuItem value="warning">警告</MenuItem>
              <MenuItem value="error">錯誤</MenuItem>
              <MenuItem value="success">成功</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            確定
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
} 