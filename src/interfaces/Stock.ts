export type Item = {
  id?: number;
  unitPrice: number;
  quantity: number;
  quantityUnit?: string;
  productName?: string;
  uom_id?: number;
  productId?: number | null | string;
  assignedVendors?: Vendor[];
};

export type Stock = {
  invoiceNumber: string;
  vendor: string;
  date: string;
  items: Item[];
};

export type Vendor = {
  name: string;
  id?: null | number;
  quantity: number | null;
};
