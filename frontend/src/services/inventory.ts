import { InventoryItem, InventoryUpdateRequest } from "../models/Inventory";

// 假資料 - 庫存項目
const mockInventoryData: InventoryItem[] = [
  {
    id: "1",
    name: "前置三道(123)",
    itemCode: "E009",
    specification: "1組",
    price: 1680,
    stockQuantity: 10,
  },
  {
    id: "2",
    name: "前置三道",
    itemCode: "Y100(五代)",
    specification: "1組",
    price: 1680,
    stockQuantity: 7,
  },
  {
    id: "3",
    name: "1-1U抗菌折疊式PP",
    itemCode: "E008 TW型",
    specification: "1支",
    price: 760,
    stockQuantity: 5,
  },
  {
    id: "4",
    name: "1-1U抗菌折疊式PP",
    itemCode: "Y001(五代)",
    specification: "1支",
    price: 760,
    stockQuantity: 10,
  },
  {
    id: "5",
    name: "2-精選椰殼",
    itemCode: "E001-1-1 TW型",
    specification: "1支",
    price: 520,
    stockQuantity: 10,
  },
  {
    id: "6",
    name: "2-精選椰殼",
    itemCode: "Y002(五代)",
    specification: "1支",
    price: 520,
    stockQuantity: 8,
  },
  {
    id: "7",
    name: "3-特選壓縮",
    itemCode: "E001-2-2 TW型",
    specification: "1支",
    price: 520,
    stockQuantity: 9,
  },
  {
    id: "8",
    name: "3-特選壓縮",
    itemCode: "Y003(五代)",
    specification: "1支",
    price: 520,
    stockQuantity: 100,
  },
  {
    id: "9",
    name: "R-RO膜 (立地型)贈廢水比",
    itemCode: "Y009(400G)/Z013-4廢水比1200",
    specification: "1支",
    price: 3440,
    stockQuantity: 100,
  },
  {
    id: "10",
    name: "R-RO膜 (立地型)贈廢水比",
    itemCode: "Y010(200G)/Z013-4廢水比1200",
    specification: "1支",
    price: 3020,
    stockQuantity: 100,
  },
  {
    id: "11",
    name: "R-RO膜 贈廢水比",
    itemCode: "Y008(五代)/Z013-1廢水比400",
    specification: "1支",
    price: 2250,
    stockQuantity: 100,
  },
  {
    id: "12",
    name: "4-共享-NO.4濾芯",
    itemCode: "E003-1 TW型",
    specification: "1支",
    price: 4180,
    stockQuantity: 100,
  },
  {
    id: "13",
    name: "4-共享-NO.4濾芯",
    itemCode: "Y004(五代)",
    specification: "1支",
    price: 4180,
    stockQuantity: 100,
  },
  {
    id: "14",
    name: "5-共享-NO.5濾芯",
    itemCode: "E004-1 TW型",
    specification: "1支",
    price: 4580,
    stockQuantity: 100,
  },
  {
    id: "15",
    name: "5-共享-NO.5濾芯",
    itemCode: "Y005(五代)",
    specification: "1支",
    price: 4580,
    stockQuantity: 100,
  },
  {
    id: "16",
    name: "6-共享-NO.6濾芯",
    itemCode: "E005-1 TW型",
    specification: "1支",
    price: 4580,
    stockQuantity: 100,
  },
  {
    id: "17",
    name: "6-共享-NO.6濾芯",
    itemCode: "Y006(五代)",
    specification: "1支",
    price: 4580,
    stockQuantity: 100,
  },
  {
    id: "18",
    name: "7-共享-NO.7濾芯",
    itemCode: "E006-1 TW型",
    specification: "1支",
    price: 1680,
    stockQuantity: 100,
  },
  {
    id: "19",
    name: "7-共享-NO.7濾芯",
    itemCode: "Y007(五代)",
    specification: "1支",
    price: 1680,
    stockQuantity: 100,
  },
];

class InventoryService {
  private inventoryData: InventoryItem[] = [...mockInventoryData];

  // 獲取所有庫存項目
  async getAllInventory(): Promise<InventoryItem[]> {
    // 模擬 API 延遲
    await new Promise((resolve) => setTimeout(resolve, 100));
    return [...this.inventoryData];
  }

  // 更新庫存數量
  async updateStockQuantity(
    request: InventoryUpdateRequest
  ): Promise<InventoryItem> {
    // 模擬 API 延遲
    await new Promise((resolve) => setTimeout(resolve, 200));

    const itemIndex = this.inventoryData.findIndex(
      (item) => item.id === request.id
    );
    if (itemIndex === -1) {
      throw new Error("庫存項目不存在");
    }

    // 更新庫存數量
    this.inventoryData[itemIndex].stockQuantity = request.stockQuantity;

    return { ...this.inventoryData[itemIndex] };
  }

  // 根據 ID 獲取庫存項目
  async getInventoryById(id: string): Promise<InventoryItem | null> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const item = this.inventoryData.find((item) => item.id === id);
    return item ? { ...item } : null;
  }

  // 搜尋庫存項目
  async searchInventory(query: string): Promise<InventoryItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const lowerQuery = query.toLowerCase();
    return this.inventoryData.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.itemCode.toLowerCase().includes(lowerQuery)
    );
  }
}

export const inventoryService = new InventoryService();
