import {
  PurchaseRequest,
  VendorAssignment,
} from "@/interfaces/PurchaseRequest";
import { purchaseRequestQueries } from "@/react-query/purchaseRequest";
import { axiosInstance } from "../axiosInstance";
import { QuotationInfo } from "@/app/(protected pages)/purchase-request/[id]/upload-quotation/[assignmentId]/page";

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
export const getVendorsAssignments = async (
  id: string | number
): Promise<VendorAssignment[]> => {
  const { data } = await axiosInstance.get(
    purchaseRequestQueries.purchaseRequest.getVendorsAssignments
      .endpoint_start +
      id +
      purchaseRequestQueries.purchaseRequest.getVendorsAssignments.endpoint_end
  );
  return data.data || null;
};

export const getVendorsAssignment = async (
  id: string | number,
  assigmentId: string | number
): Promise<VendorAssignment> => {
  const { data } = await axiosInstance.get(
    purchaseRequestQueries.purchaseRequest.getVendorsAssignment.endpoint_start +
      id +
      purchaseRequestQueries.purchaseRequest.getVendorsAssignment.endpoint_end +
      assigmentId
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

export const requestQuotation = async (body: {
  purchase_request_id: number;
  pr_vendor_assignment_ids: number[];
}) => {
  const { data } = await axiosInstance.post(
    purchaseRequestQueries.purchaseRequest.requestQuotation.endpoint,
    body
  );
  return data.data || null;
};
export const uploadQuotation = async (body: QuotationInfo) => {
  const { data } = await axiosInstance.post(
    purchaseRequestQueries.purchaseRequest.uploadQuotation.endpoint,
    body
  );
  return data.data || null;
};
