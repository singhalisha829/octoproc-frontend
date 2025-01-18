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

export interface QuotationItem {
  id: number;
  assignment_item_id: number;
  unit_price: number;
  quantity: number;
  net_amount: number;
  tax_amount: number;
  total_amount: number;
  additional_notes: string;
}
export interface Quotation {
  id: number;
  status: string;
  net_amount: number;
  tax_amount: number;
  total_amount: number;
  file_url: string;
  additional_notes: string;
  items: Array<QuotationItem>;
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
  quotations: Array<Quotation>;
}

export interface MergedVendorAssignment extends Omit<VendorAssignment, "items"> {
  items: Array<
    VendorAssigmentItem & {
      quotation?: Quotation;
    }
  >;
}