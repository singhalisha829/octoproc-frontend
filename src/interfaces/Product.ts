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

export interface UNSPSC {
  code: string;
  description: string;
  id?: number | string;
  is_deleted: boolean;
  name: string;
}

export interface Family extends UNSPSC {
  segment_id: number;
}

export interface Class extends UNSPSC {
  family_id: number;
}

export interface Commodity extends UNSPSC {
  class_id: number;
  unspsc: string;
}

// unspsc (segment, family, class, commodity),
