import { Product } from "./Product";

export interface GeneratePurchaseOrderDetails {

    vendor_quotation_id: number;
    expected_delivery_date: string;
    warehouse_id?: number;
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
    vendor_name: string;
}



export interface PurchaseOrderItem {
    id: number;
    pr_item_id: number;
    name: string
    vendor_assignment_item_id: number;
    quotation_item_id: number;
    quantity: number;
    unit_price: number;
    delivered_quantity: number;
    undelivered_quantity: number;
    net_amount: number;
    tax_amount: number;
    total_amount: number;
    status: string;
    notes: string;
    created_by: number;
    updated_by: number;
    product: Product
}

export interface PurchaseOrderDetails {
    id: number;
    reference_no: string;
    vendor_id: number;
    vendor_name: string;
    purchase_request_id: number;
    vendor_assignment_id: number;
    vendor_quotation_id: number;
    order_date: string;
    expected_delivery_date: string;
    shipping_address: string;
    billing_address: string;
    status: string;
    net_amount: number;
    tax_amount: number;
    shipping_cost: number;
    total_amount: number;
    payment_terms: string;
    notes: string;
    created_at: string;
    updated_at: string;
    created_by: number;
    updated_by: number;
    items: PurchaseOrderItem[];
}