import { InventoryApiResponse } from "@/interfaces/Inventory"
import { axiosInstance } from "../axiosInstance"

export const getInventories = async (body: {
    enterprise_client_id: number | null,
    warehouse_ids?: number[]
}): Promise<InventoryApiResponse[]> => {
    const { data } = await axiosInstance.post("/inventory/filter", { ...body })
    return data?.data || null
}
// const getInventories = async () => {
//     const { data } = await axiosInstance.get("/inventory/filter")
//     return data?.data || null
// }
// const getInventories = async () => {
//     const { data } = await axiosInstance.get("/inventory/filter")
//     return data?.data || null
// }