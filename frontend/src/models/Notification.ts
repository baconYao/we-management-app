export interface NotificationRecord {
  id: string;
  date: Date;
  method: "電話" | "Line" | "Wechat";
  notes: string;
}

export interface MaintenanceNotification {
  notificationId: string;
  machineId: string;
  customerName: string;
  memberId: string;
  consumableParts: string[];
  lastReplacementDate: Date;
  notificationHistory: NotificationRecord[];
}

export interface CustomerInfo {
  memberId: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  machineModel: string;
  installDate: Date;
}

export interface MaintenanceRecord {
  notificationId: string;
  machineId: string;
  customerName: string;
  memberId: string;
  consumableParts: string[];
  lastReplacementDate: Date;
  notificationHistory: NotificationRecord[];
}

export const generateNotificationId = (): string => {
  const date = new Date();
  const dateStr =
    date.getFullYear().toString() +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    date.getDate().toString().padStart(2, "0");
  const random = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
  return `${dateStr}-${random}`;
};
