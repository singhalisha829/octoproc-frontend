import { Vendor } from "@/interfaces/Vendors";
import { axiosInstance } from "@/api/axiosInstance";
import { MASTER_API_CONSTANT } from "@/api/masterdata";

export const addVendor = (vendor: Vendor) => {
  return axiosInstance.post(`${MASTER_API_CONSTANT}/vendor`, vendor);
};
export const getVendors = async (): Promise<Vendor[]> => {
  const { data } = await axiosInstance.get(`${MASTER_API_CONSTANT}/vendor`);
  return data?.data;
};
