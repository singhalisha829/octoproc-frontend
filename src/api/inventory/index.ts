import { InventoryApiResponse } from "@/interfaces/Inventory"
import { axiosInstance } from "../axiosInstance"
import { InventoryRecord } from "@/interfaces/Legder"
import { StockRequest } from "@/interfaces/Stock"

export const getInventories = async (body: {
    enterprise_client_id: number | null,
    warehouse_ids?: number[]
}): Promise<InventoryApiResponse[]> => {
    const { data } = await axiosInstance.post("/inventory/filter", { ...body })
    return data?.data || null
}
export const getLegders = async ({ pageSize = 100, pageNum = 1, enterprise_client_id, inventory_item_ids }: { pageSize: number, pageNum: number, enterprise_client_id: number | null , inventory_item_ids: number[] | null}): Promise<InventoryRecord[]> => {
    const { data } = await axiosInstance.post(`/inventory/transaction/ledger/filter?page_num=${pageNum}&page_size=${pageSize}`, { enterprise_client_id,inventory_item_ids })
    return data?.data || null
}


export const stockIn = async (body: StockRequest) => {
    return await axiosInstance.post("/inventory/request/items/add", body)
}
