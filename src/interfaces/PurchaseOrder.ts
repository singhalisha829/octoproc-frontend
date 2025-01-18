export interface GeneratePurchaseOrderDetails {

    vendor_quotation_id: number;
    expected_delivery_date: string;
    shipping_address: string;
    billing_address: string;
    shipping_cost: number;
    payment_terms: string;
    notes: string;
    items?: Array<{ quotation_item_id: number; notes: string }>;
}