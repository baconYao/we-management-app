import { WaterPurifierInterface } from "./WaterPurifier";

export interface UserInterface {
  id: number;
  uid: string;
  memberId: string | null;
  name: string;
  gender: "male" | "female";
  birthDate: string; // YYYY-MM-DD
  address: string;
  phone: string;
  email?: string;
  socialMedia: {
    line?: string;
    wechat?: string;
  };
  memberJoinDate?: string; // YYYY-MM-DD
  role: "admin" | "user" | "local-admin";
  createdAt: string;
  waterPurifiers?: WaterPurifierInterface[];
}
