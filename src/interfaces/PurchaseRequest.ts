import { Item, Vendor } from "./Stock";

export type PurchaseRequest = {
  id: string | number;
  name: string;
  items: Item[];
  vendors: Vendor[];
};
