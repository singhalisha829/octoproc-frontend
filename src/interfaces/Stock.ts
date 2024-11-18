export type Item = {
  unitPrice: number;
  quantity: number;
  quantityUnit?: string;
  partName: string;
  partId: number | string;
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
