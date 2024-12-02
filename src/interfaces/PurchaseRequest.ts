import { Client } from "./Client";
import { Item, Vendor } from "./Stock";

export type PurchaseRequest = {
  id: number;
  created_at: string;
  created_by: number;
  enterprise_client: Client;
  is_deleted: false;
  reference_no: string;
  updated_at: string;
  updated_by: number;
};
