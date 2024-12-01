import { axiosInstance } from "../axiosInstance";

export const getPurchaseRequests = async () => {
  const { data } = await axiosInstance.post(
    purchaseRequestQueries.purchaseRequest.getPurchaseRequests.endpoint
  );
  return data.data;
};
