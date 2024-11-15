export type Item = {
  unitPrice: number;
  quantity: number;
  quantityUnit?: string;
  partName: string;
  partId: number | string;
};

export type Stock = {
  invoiceNumber: string;
  vendor: string;
  date: string;
  items: Item[];
};
