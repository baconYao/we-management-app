import {
  CustomerInfo,
  MaintenanceRecord,
  generateNotificationId,
} from "../models/Notification";
import { initialCustomers } from "./customers";

// 从 customers.ts 导入的客户数据转换为 CustomerInfo 格式
export const mockCustomers: CustomerInfo[] = initialCustomers.map(
  (customer) => ({
    memberId: customer.memberId || "非會員", // 为没有 memberId 的客户显示"非會員"
    name: customer.name,
    phone: customer.phone,
    email: customer.email || "",
    address: customer.address,
    machineModel: customer.waterPurifiers?.[0]?.model || "廚下型",
    installDate: customer.waterPurifiers?.[0]?.installationDate
      ? new Date(customer.waterPurifiers[0].installationDate)
      : new Date(),
  })
);

export const mockMaintenanceRecords: MaintenanceRecord[] = [
  {
    notificationId: generateNotificationId(),
    machineId: "WM-2023-001",
    customerName: "張三",
    memberId: "M001",
    consumableParts: ["前置濾芯", "RO膜"],
    lastReplacementDate: new Date("2024-10-15"),
    notificationHistory: [
      {
        id: "N001",
        date: new Date("2024-12-25"),
        method: "電話",
        notes: "客戶表示下週一方便更換",
      },
    ],
  },
  {
    notificationId: generateNotificationId(),
    machineId: "WM-2023-002",
    customerName: "李四",
    memberId: "非會員",
    consumableParts: ["活性碳濾芯"],
    lastReplacementDate: new Date("2024-11-20"),
    notificationHistory: [],
  },
  {
    notificationId: generateNotificationId(),
    machineId: "WM-2023-003",
    customerName: "王五",
    memberId: "M003",
    consumableParts: ["前置濾芯", "活性碳濾芯", "RO膜"],
    lastReplacementDate: new Date("2024-08-30"),
    notificationHistory: [
      {
        id: "N002",
        date: new Date("2024-12-20"),
        method: "Line",
        notes: "已透過LINE告知，客戶已讀",
      },
      {
        id: "N003",
        date: new Date("2024-12-28"),
        method: "電話",
        notes: "無人接聽，已留語音訊息",
      },
    ],
  },
  {
    notificationId: generateNotificationId(),
    machineId: "WM-2023-004",
    customerName: "陳六",
    memberId: "非會員",
    consumableParts: ["後置濾芯"],
    lastReplacementDate: new Date("2024-12-01"),
    notificationHistory: [],
  },
  {
    notificationId: generateNotificationId(),
    machineId: "WM-2023-005",
    customerName: "林七",
    memberId: "M005",
    consumableParts: ["前置濾芯", "RO膜"],
    lastReplacementDate: new Date("2024-09-15"),
    notificationHistory: [
      {
        id: "N004",
        date: new Date("2024-12-26"),
        method: "電話",
        notes: "客戶確認週三下午2點進行更換",
      },
    ],
  },
  {
    notificationId: generateNotificationId(),
    machineId: "WM-2023-006",
    customerName: "黃八",
    memberId: "非會員",
    consumableParts: ["前置濾芯", "活性碳濾芯"],
    lastReplacementDate: new Date("2024-07-10"),
    notificationHistory: [
      {
        id: "N005",
        date: new Date("2024-12-27"),
        method: "Wechat",
        notes: "客戶要求延後到明年1月",
      },
    ],
  },
  {
    notificationId: generateNotificationId(),
    machineId: "WM-2023-007",
    customerName: "趙九",
    memberId: "M007",
    consumableParts: ["前置濾芯", "RO膜", "後置濾芯"],
    lastReplacementDate: new Date("2024-06-25"),
    notificationHistory: [
      {
        id: "N006",
        date: new Date("2024-12-24"),
        method: "電話",
        notes: "客戶表示本週末有空",
      },
    ],
  },
  {
    notificationId: generateNotificationId(),
    machineId: "WM-2023-008",
    customerName: "吳十",
    memberId: "非會員",
    consumableParts: ["活性碳濾芯", "後置濾芯"],
    lastReplacementDate: new Date("2024-05-20"),
    notificationHistory: [],
  },
  {
    notificationId: generateNotificationId(),
    machineId: "WM-2023-009",
    customerName: "周十一",
    memberId: "M009",
    consumableParts: ["前置濾芯"],
    lastReplacementDate: new Date("2024-04-15"),
    notificationHistory: [
      {
        id: "N007",
        date: new Date("2024-12-23"),
        method: "Line",
        notes: "已發送通知，等待客戶回覆",
      },
    ],
  },
  {
    notificationId: generateNotificationId(),
    machineId: "WM-2023-010",
    customerName: "鄭十二",
    memberId: "非會員",
    consumableParts: ["前置濾芯", "RO膜", "活性碳濾芯"],
    lastReplacementDate: new Date("2024-03-10"),
    notificationHistory: [
      {
        id: "N008",
        date: new Date("2024-12-22"),
        method: "電話",
        notes: "客戶表示下個月再更換",
      },
    ],
  },
  {
    notificationId: generateNotificationId(),
    machineId: "WM-2023-011",
    customerName: "劉十三",
    memberId: "M011",
    consumableParts: ["後置濾芯"],
    lastReplacementDate: new Date("2024-02-28"),
    notificationHistory: [],
  },
  {
    notificationId: generateNotificationId(),
    machineId: "WM-2023-012",
    customerName: "孫十四",
    memberId: "非會員",
    consumableParts: ["前置濾芯", "RO膜"],
    lastReplacementDate: new Date("2024-01-15"),
    notificationHistory: [
      {
        id: "N009",
        date: new Date("2024-12-21"),
        method: "Wechat",
        notes: "客戶已確認更換時間",
      },
    ],
  },
  {
    notificationId: generateNotificationId(),
    machineId: "WM-2023-013",
    customerName: "郭十五",
    memberId: "M013",
    consumableParts: ["前置濾芯", "活性碳濾芯", "RO膜", "後置濾芯"],
    lastReplacementDate: new Date("2023-12-20"),
    notificationHistory: [
      {
        id: "N010",
        date: new Date("2024-12-20"),
        method: "電話",
        notes: "客戶要求緊急更換",
      },
      {
        id: "N011",
        date: new Date("2024-12-25"),
        method: "Line",
        notes: "已安排明天上午更換",
      },
    ],
  },
];
