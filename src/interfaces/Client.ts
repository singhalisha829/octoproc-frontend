import { ContactPerson } from "./Vendors";

export interface Client {
  name: string;
  code: string;
  address_line_1: string;
  address_line_2: string;
  city_id: number;
  state_id: number;
  country_id: number;
  pincode: string;
  pan_number: string;
  gst_number: null | number | string;
  id: number;
  contact_persons: Array<ContactPerson>;
}

export interface ClientDetails {
  name: string;
  code?: string;
  address_line_1: string;
  address_line_2: string;
  city_id: number | null;
  state_id: number | null;
  country_id: number | null;
  pincode: string;
  pan_number: string;
  gst_number: null | number | string;
  contact_persons?: Array<ContactPerson>;
  id?: number
}


export interface Warehouse {
  name: string
  code: string
  address: string
  country_id: number | null
  state_id: number | null
  city_id: number | null
  enterprise_client_id: number
  warehouse_id?: number
}


export interface ClientDetailApiResponse {
  "client": Client,
  "contact_persons": ContactPerson[],
  "warehouses": Warehouse[]
}
