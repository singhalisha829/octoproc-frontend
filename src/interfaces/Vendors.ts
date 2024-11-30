export interface ContactPerson {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country_code: string;
  designation: string;
}

export interface Vendor {
  id?: string | number;
  name: string;
  address: string;
  country_id: number;
  state_id: number;
  city_id: number;
  gstin: string;
  pan: string;
  contact_persons: Array<ContactPerson>;
  data: unknown;
}
