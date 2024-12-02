import { Vendor } from "@/interfaces/Vendors";
import { axiosInstance } from "@/api/axiosInstance";
import { masterApiQuery } from "@/react-query/masterApiQueries";
import { Product } from "@/interfaces/Product";

export const addVendor = (vendor: Vendor) => {
  return axiosInstance.post(masterApiQuery.vendor.addVendors.endpoint, vendor);
};
export const getVendors = async (): Promise<Vendor[]> => {
  const { data } = await axiosInstance.get(
    masterApiQuery.vendor.getVendor.endpoint
  );
  return data?.data;
};
export const getVendor = async (vendorId: string): Promise<Vendor> => {
  const { data } = await axiosInstance.get(
    masterApiQuery.vendor.getVendor.endpoint + vendorId
  );
  return data?.data;
};
export const getVendorCatalogue = async (
  vendorId: string
): Promise<{ items: Product[]; vendor_id: number }> => {
  const { data } = await axiosInstance.get(
    masterApiQuery.vendor.getVendorCatalogue.endpoint + vendorId
  );
  return data?.data;
};

export const addItemToCatalogue = async (data: {
  vendor_id: number;
  product_ids: Array<number | string>;
}) => {
  return axiosInstance.post(
    masterApiQuery.vendor.addItemsToCatalogue.endpoint,
    data
  );
};

export const removeItemFromCatalogue = async (data: {
  vendor_id: number;
  product_ids: Array<number | string>;
}) => {
  return axiosInstance.post(
    masterApiQuery.vendor.removeItemsFromCatalogue.endpoint,
    data
  );
};
