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
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { NotificationRecord } from '../../models/Notification';

interface NotificationHistoryDialogProps {
  open: boolean;
  onClose: () => void;
  notificationHistory: NotificationRecord[];
  customerName: string;
}

export default function NotificationHistoryDialog({ 
  open, 
  onClose, 
  notificationHistory, 
  customerName 
}: NotificationHistoryDialogProps) {
  // 按時間排序，最新的排在最上面
  const sortedHistory = [...notificationHistory].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        通知歷史記錄 - {customerName}
      </DialogTitle>
      <DialogContent>
        {sortedHistory.length > 0 ? (
          <List>
            {sortedHistory.map((record, index) => (
              <React.Fragment key={record.id}>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Chip
                          label={record.method}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        <Typography variant="body2" color="text.secondary">
                          {record.date.toLocaleDateString()} {record.date.toLocaleTimeString()}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography variant="body2" color="text.primary">
                        {record.notes || "無備註"}
                      </Typography>
                    }
                  />
                </ListItem>
                {index < sortedHistory.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body1" color="text.secondary">
              暫無通知記錄
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
