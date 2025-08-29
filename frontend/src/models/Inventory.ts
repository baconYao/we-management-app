export interface InventoryItem {
  id: string;
  name: string;
  itemCode: string;
  specification: string;
  price: number;
  stockQuantity: number;
}

export interface InventoryUpdateRequest {
  id: string;
  stockQuantity: number;
}
