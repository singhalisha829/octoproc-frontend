import { InventoryApiResponse } from "@/interfaces/Inventory"
import { axiosInstance } from "../axiosInstance"

export const getInventories = async (body: {
    enterprise_client_id: number | null,
    warehouse_ids?: number[]
}): Promise<InventoryApiResponse[]> => {
    const { data } = await axiosInstance.post("/inventory/filter", { ...body })
    return data?.data || null
}
export const getLegders = async ({ pageSize = 100, pageNum = 1, enterprise_client_id }: { pageSize: number, pageNum: number, enterprise_client_id: number }) => {
    const { data } = await axiosInstance.post(`/inventory/transaction/ledger/filter?page_num=${pageNum}&page_size=${pageSize}`, { enterprise_client_id })
    return data?.data || null
}


// const getInventories = async () => {
//     const { data } = await axiosInstance.get("/inventory/filter")
//     return data?.data || null
// }