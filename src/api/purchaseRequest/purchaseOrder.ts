import { purchaseOrderQueries } from "@/react-query/purchaseOrderQueries";
import { axiosInstance } from "../axiosInstance";
import { GeneratePurchaseOrderDetails, PurchaseOrderDetails } from "@/interfaces/PurchaseOrder";

export const getPurchaseOrders = async (filters = {}) => {
  const { data } = await axiosInstance.post(
    purchaseOrderQueries.getPurchaseOrders.endpoint,
    filters
  );
  return data.data || null;
};

export const getPurchaseOrder = async (id: number): Promise<PurchaseOrderDetails> => {
  const { data } = await axiosInstance.get(
    purchaseOrderQueries.getPurchaseOrder.endpoint + id
  );
  return data.data || null;
};

export const createPurchaseOrder = async (body: GeneratePurchaseOrderDetails) => {
  const { data } = await axiosInstance.post(
    purchaseOrderQueries.createPurchaseOrder.endpoint,
    body
  );
  return data.data || null;
};
