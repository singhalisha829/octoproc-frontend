import { purchaseOrderQueries } from "@/react-query/purchaseOrderQueries";
import { axiosInstance } from "../axiosInstance";

export const getPurchaseOrders = async (filters = {}) => {
  const { data } = await axiosInstance.post(
    purchaseOrderQueries.getPurchaseOrders.endpoint,
    filters
  );
  return data.data || null;
};
export const getPurchaseOrder = async (id: number) => {
  const { data } = await axiosInstance.get(
    purchaseOrderQueries.getPurchaseOrders.endpoint + id
  );
  return data.data || null;
};
export const createPurchaseOrder = async (body = null) => {
  const { data } = await axiosInstance.post(
    purchaseOrderQueries.createPurchaseOrder.endpoint,
    body
  );
  return data.data || null;
};
