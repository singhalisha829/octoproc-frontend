import { purchaseRequestQueries } from "@/react-query/purchaseRequest";
import { axiosInstance } from "../axiosInstance";
import { PurchaseRequest } from "@/interfaces/PurchaseRequest";

export const getPurchaseRequests = async (): Promise<PurchaseRequest[]> => {
  const { data } = await axiosInstance.post(
    purchaseRequestQueries.purchaseRequest.getPurchaseRequests.endpoint,
    {}
  );
  return data.data;
};
export const createPurchaseRequest = async (data: {
  enterprise_client_id: number;
  reference_no: string;
  created_by: 1;
  items: { product_id?: number | null; uom_id?: number; quantity: number }[];
}) => {
  return axiosInstance.post(
    purchaseRequestQueries.purchaseRequest.createPurchaseRequest.endpoint,
    data
  );
};
