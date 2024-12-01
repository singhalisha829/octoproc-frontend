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
  gst_number: null | number;
  id: number;
  contact_persons: Array<ContactPerson>;
}

export interface ClientDetails {
  name: string;
  code: string;
  address_line_1: string;
  address_line_2: string;
  city_id: number | null;
  state_id: number | null;
  country_id: number | null;
  pincode: string;
  pan_number: string;
  gst_number: string;
  contact_persons?: Array<ContactPerson>;
}
