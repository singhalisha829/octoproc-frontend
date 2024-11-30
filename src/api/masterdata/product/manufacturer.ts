import { axiosInstance } from "@/api/axiosInstance";
import { GenericModalData, MASTER_API_CONSTANT } from "@/api/masterdata";
import { AxiosResponse } from "axios";

export const addManufacturer = (manufacturer: GenericModalData): Promise<AxiosResponse<any, any>> => {
  return axiosInstance.post(
    `${MASTER_API_CONSTANT}/manufacturer/`,
    manufacturer
  );
};
