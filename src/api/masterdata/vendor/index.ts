import { Vendor } from "@/interfaces/Vendors";
import { axiosInstance } from "@/api/axiosInstance";
import { masterApiQuery } from "@/react-query/masterApiQueries";

export const addVendor = (vendor: Vendor) => {
  return axiosInstance.post(masterApiQuery.vendor.addVendors.endpoint, vendor);
};
export const getVendors = async (): Promise<Vendor[]> => {
  const { data } = await axiosInstance.get(
    masterApiQuery.vendor.addVendors.endpoint
  );
  return data?.data;
};
