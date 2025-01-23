export interface GeneratePurchaseOrderDetails {

    vendor_quotation_id: number;
    expected_delivery_date: string;
    shipping_address?: string | number;
    billing_address: string;
    shipping_cost: number;
    payment_terms: string;
    notes: string;
    items?: Array<{ quotation_item_id: number; notes: string }>;
}

export interface PurchaseOrder {
    id: number;
    reference_no: string;
    vendor_id: number;
    order_date: string;
    expected_delivery_date: string;
    shipping_address: string;
    billing_address: string;
    status: string;
    total_amount: number;
    tax_amount: number;
    shipping_cost: number;
    created_at: string;
    updated_at: string;
    created_by: number;
    updated_by: number;
}