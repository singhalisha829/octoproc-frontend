import { Client, Warehouse } from "./Client"
import { Product } from "./Product"



export interface InventoryItem {
    "id": number,
    "product": Product,
    "quantity": number
}
export interface InventoryApiResponse {
    "inventory": {
        "id": number,
        "warehouse": Warehouse
        "enterprise_client": Client
    },
    "items": Array<InventoryItem>
}