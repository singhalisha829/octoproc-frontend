import { axiosInstance } from "@/api/axiosInstance";
import { GenericModalData } from "@/api/masterdata";
import { masterApiQuery } from "@/react-query/masterApiQueries";
import { AxiosResponse } from "axios";

export const addManufacturer = (
  manufacturer: GenericModalData
): Promise<AxiosResponse<any, any>> => {
  return axiosInstance.post(
    masterApiQuery.manufacturer.addManufacturer.endpoint,
    manufacturer
  );
};
export const getManufacturers = async () => {
  const { data } = await axiosInstance.get(
    masterApiQuery.manufacturer.getManufacturers.endpoint
  );
  return data.data;
};
