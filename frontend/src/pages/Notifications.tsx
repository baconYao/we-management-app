import { useState, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '../components/Layout';
import NotificationTable from '../components/notification/NotificationTable';
import CustomerInfoDialog from '../components/notification/CustomerInfoDialog';
import NotificationDialog from '../components/notification/NotificationDialog';
import { 
  MaintenanceRecord, 
  CustomerInfo, 
  NotificationRecord 
} from '../models/Notification';
import { 
  mockMaintenanceRecords, 
  mockCustomers 
} from '../mock/notifications';

export default function Notifications() {
  const [notifications, setNotifications] = useState<MaintenanceRecord[]>(mockMaintenanceRecords);
  const [customers] = useState<CustomerInfo[]>(mockCustomers);
  const [customerInfoOpen, setCustomerInfoOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerInfo | null>(null);
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState<string>('');

  // 按照最後更換日期排序，越靠近的排在越上面
  const sortedNotifications = useMemo(() => {
    return [...notifications].sort((a, b) => {
      return new Date(b.lastReplacementDate).getTime() - new Date(a.lastReplacementDate).getTime();
    });
  }, [notifications]);

  const handleShowCustomerInfo = (customer: CustomerInfo) => {
    setSelectedCustomer(customer);
    setCustomerInfoOpen(true);
  };

  const handleCloseCustomerInfo = () => {
    setCustomerInfoOpen(false);
    setSelectedCustomer(null);
  };

  const handleAddNotification = (notificationId: string) => {
    setSelectedNotificationId(notificationId);
    setNotificationDialogOpen(true);
  };

  const handleCloseNotificationDialog = () => {
    setNotificationDialogOpen(false);
    setSelectedNotificationId('');
  };

  const handleSubmitNotification = (notificationData: Omit<NotificationRecord, 'id' | 'date'>) => {
    const newNotification: NotificationRecord = {
      id: `N${Date.now()}`,
      date: new Date(),
      ...notificationData,
    };

    setNotifications(prev => prev.map(notification => {
      if (notification.notificationId === selectedNotificationId) {
        return {
          ...notification,
          notificationHistory: [...notification.notificationHistory, newNotification],
        };
      }
      return notification;
    }));
    
    handleCloseNotificationDialog();
  };

  const handleCompleteReplacement = (notificationId: string) => {
    setNotifications(prev => prev.filter(notification => 
      notification.notificationId !== notificationId
    ));
  };

  return (
    <Layout title="耗材更換通知">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          耗材更換管理
        </Typography>
        <Typography variant="body2" color="text.secondary">
          管理客戶耗材更換通知，追蹤更換狀態和通知記錄
        </Typography>
      </Box>

      <NotificationTable
        notifications={sortedNotifications}
        customers={customers}
        onCompleteReplacement={handleCompleteReplacement}
        onAddNotification={handleAddNotification}
        onShowCustomerInfo={handleShowCustomerInfo}
      />

      {/* 客戶資訊對話框 */}
      <CustomerInfoDialog
        open={customerInfoOpen}
        onClose={handleCloseCustomerInfo}
        customer={selectedCustomer}
      />

      {/* 通知記錄對話框 */}
      <NotificationDialog
        open={notificationDialogOpen}
        onClose={handleCloseNotificationDialog}
        onSubmit={handleSubmitNotification}
        customerName={
          notifications.find(n => n.notificationId === selectedNotificationId)?.customerName || ''
        }
      />
    </Layout>
  );
} 