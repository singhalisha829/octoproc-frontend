import { Client } from "./Client";
import { Product } from "./Product";


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
