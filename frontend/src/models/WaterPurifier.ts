import { ConsumableStatusSetInterface } from "./Consumable";

export interface MaintenanceRecordInterface {
  date: string;
  items: string[];
  notes?: string;
}

export interface WaterPurifierInterface {
  model: string;
  serialNumber: string;
  installationDate: string;
  location: string;
  consumableStatus: ConsumableStatusSetInterface;
  maintenanceRecords?: MaintenanceRecordInterface[];
}
