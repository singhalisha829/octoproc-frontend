export type Item = {
  unitPrice: number;
  quantity: number;
  quantityUnit?: string;
  productName?: string;
  productId?: number | null;
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
  id: number | string;
  quantity: number;
};
