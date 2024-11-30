export interface Product {
  name: string;
  description: string;
  unspsc: string;
  uom_id: number;
  hsn_code: string;
  manufacturer_id: number;
  manufacturer_sku_code: string;
  data: unknown;
}

// unspsc (segment, family, class, commodity),
