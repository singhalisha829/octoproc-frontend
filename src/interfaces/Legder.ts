interface InventoryEntry {
    id: number;
    inventory_id: number;
    inventory_item_id: number;
    quantity: number;
    starting_balance: number;
    closing_balance: number;
    transaction_type: string;
    transaction_id: number;
}

interface Transaction {
    id: number;
    inventory_id: number;
    request_type: string;
    request_context_type: string;
    request_context_id: string;
    remark: string;
    meta_data: {
        purchase_request_id: number;
        pr_reference_no: string;
        vendor_id: number;
        vendor_quotation_id: number;
        vendor_assignment_id: number;
    };
}

interface Product {
    name: string;
    description: string;
    unspsc_code: string;
    uom_id: number;
    version: string;
    hsn_code: string;
    manufacturer_id: number;
    manufacturer_sku_code: string;
    data: null;
    id: number;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
}

interface UnitOfMeasure {
    name: string;
    symbol: string;
    type: string;
    validation_type: number;
    id: number;
    is_deleted: boolean;
}

interface InventoryRecord {
    entry: InventoryEntry;
    transaction: Transaction;
    product: Product;
    uom: UnitOfMeasure;
}