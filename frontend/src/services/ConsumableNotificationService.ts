import { ConsumableStatusInterface } from "../models/Consumable";

export interface ConsumableNotificationService {
  // 檢查所有淨水器的耗材狀態
  checkConsumablesStatus(): Promise<void>;

  // 計算下次更換時間
  calculateNextReplacementDate(
    installedAt: Date,
    lifespan: { value: number; unit: "d" | "m" | "y" }
  ): Date;

  // 發送通知
  sendNotification(
    userId: string,
    purifierId: string,
    consumable: ConsumableStatusInterface
  ): Promise<void>;
}
