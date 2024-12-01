export interface Product {
  id?: number | string;
  name: string;
  description: string;
  unspsc: string;
  uom_id: number;
  hsn_code: string;
  manufacturer_id: number;
  manufacturer_sku_code: string;
  data: unknown;
}

export interface BASE_UNSPSC_HELPER_TYPE {
  code: string;
  description: string | null;
  id?: number | string;
  is_deleted: boolean;
  name: string;
}

export interface UNSPSC extends BASE_UNSPSC_HELPER_TYPE {
  segment_id: number;
  family_id: number;
  class_id: number;
  commodity_id: number;
}

export interface Family extends BASE_UNSPSC_HELPER_TYPE {
  segment_id: number;
}

export interface Class extends BASE_UNSPSC_HELPER_TYPE {
  family_id: number;
}

export interface Commodity extends BASE_UNSPSC_HELPER_TYPE {
  class_id: number;
  unspsc: UNSPSC;
}

// unspsc (segment, family, class, commodity),
