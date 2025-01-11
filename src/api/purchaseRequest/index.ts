import { purchaseRequestQueries } from "@/react-query/purchaseRequest";
import { axiosInstance } from "../axiosInstance";
import { PurchaseRequest } from "@/interfaces/PurchaseRequest";
import { Vendor } from "@/interfaces/Stock";

export const getPurchaseRequests = async (): Promise<PurchaseRequest[]> => {
  const { data } = await axiosInstance.post(
    purchaseRequestQueries.purchaseRequest.getPurchaseRequests.endpoint,
    {}
  );
  return data.data || null;
};
export const getPurchaseRequest = async (
  id: string | number
): Promise<PurchaseRequest> => {
  const { data } = await axiosInstance.get(
    purchaseRequestQueries.purchaseRequest.getPurchaseRequest.endpoint + id
  );
  return data.data || null;
};
export const createPurchaseRequest = async (data: {
  enterprise_client_id: number | null;
  reference_no: string;
  created_by: 1;
  items: {
    product_id?: number | null | string;
    uom_id?: number;
    quantity: number;
  }[];
}) => {
  return axiosInstance.post(
    purchaseRequestQueries.purchaseRequest.createPurchaseRequest.endpoint,
    data
  );
};

export const getItemWiseAssignedVendors = async (id: string | number) => {
  const { data } = await axiosInstance.get(
    purchaseRequestQueries.purchaseRequest.getItemWiseAssignedVendor
      .endpoint_start +
      id +
      purchaseRequestQueries.purchaseRequest.getItemWiseAssignedVendor
        .endpoint_end
  );
  return data.data || null;
};
export const getVendorsAssignments = async (id: string | number) => {
  const { data } = await axiosInstance.get(
    purchaseRequestQueries.purchaseRequest.getVendorsAssignments
      .endpoint_start +
      id +
      purchaseRequestQueries.purchaseRequest.getVendorsAssignments.endpoint_end
  );
  return data.data || null;
};
export const assignVendor = async (body: {
  purchase_request_id: number;
  purchase_request_item_id: number;
  assignments: Array<{
    quantity: number;
    vendor_id: number | string;
    uom_id?: number;
  }>;
}) => {
  const { data } = await axiosInstance.post(
    purchaseRequestQueries.purchaseRequest.assignVendors.endpoint,
    body
  );
  return data.data || null;
};
