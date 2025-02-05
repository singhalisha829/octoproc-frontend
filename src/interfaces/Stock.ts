export interface AssignedVendorInItemwise {
  id: number;
  quantity: number;
  vendor: {
    id: number;
    name: string;
  };
}

export type Item = {
  id?: number;
  unitPrice?: number;
  quantity: number;
  quantityUnit?: string;
  productName?: string;
  uom_id?: number;
  productId?: number | null | string;
  assignedVendors?: Vendor[];
  assignments?: Array<AssignedVendorInItemwise>;
  assigned_quantity?: number;
  unit_symbol?: string
};



export type StockIn = {
  client_id: number | null
  warehouse_id?: number | null
  remark: string
  request_context_id?: number | null
  request_context_type: string
  delivery_tracking_number: string
  delivery_challan_file_urls: Array<string>
  invoice_file_urls: Array<string>
  items: Item[];
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


export interface StockRequestItem {
  product_id?: number | null | string;
  quantity: number;
  remark: string;
}

export interface StockRequest {
  request_type: string;
  items: StockRequestItem[];
  warehouse_id?: number | null
  remark: string
  request_context_id?: string | null
  request_context_type: string
  delivery_tracking_number: string
  delivery_challan_file_urls: Array<string>
  invoice_file_urls: Array<string>

}