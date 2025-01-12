import { Client } from "./Client";
import { Product } from "./Product";
import { Vendor } from "./Vendors";

export interface PurchaseRequestItem {
  id: number;
  quantity: number;
  product: Product;
  assigned_quantity: number;
  status: string;
  created_at: string;
  updated_at: string;
  created_by: number;
  updated_by: number;
  assignments?: Array<{
    id: number;
    quantity: number;
    vendor: {
      id: number;
      name: string;
    };
  }>;
}

export interface PurchaseRequest {
  id: number;
  status: string;
  enterprise_client_id: number;
  reference_no: string;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  items: Array<PurchaseRequestItem>;
  enterprise_client: Client;
}

export interface VendorAssigmentItem {
  id: number;
  quantity: number;
  status: string;
  created_at: string;
  updated_at: string;
  created_by: number;
  updated_by: number;
  purchase_request_item: PurchaseRequestItem;
}
export interface VendorAssignment {
  id: number;
  status: string;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  vendor: Vendor;
  items: VendorAssigmentItem[];
}
