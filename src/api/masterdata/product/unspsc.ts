import { axiosInstance } from "@/api/axiosInstance";
import { GenericModalData } from "@/api/masterdata";
import { MASTER_API_CONSTANT } from "@/api/masterdata";
import { AxiosResponse } from "axios";

export const addSegment = (
  data: GenericModalData
): Promise<AxiosResponse<any, any>> => {
  return axiosInstance.post(`${MASTER_API_CONSTANT}/unspsc/segment/`, data);
};
export const addClass = (
  data: GenericModalData
): Promise<AxiosResponse<any, any>> => {
  return axiosInstance.post(`${MASTER_API_CONSTANT}/unspsc/class/`, data);
};
export const addCommodity = (
  data: GenericModalData
): Promise<AxiosResponse<any, any>> => {
  return axiosInstance.post(`${MASTER_API_CONSTANT}/unspsc/commodity/`, data);
};
export const addFamily = (
  data: GenericModalData
): Promise<AxiosResponse<any, any>> => {
  return axiosInstance.post(`${MASTER_API_CONSTANT}/unspsc/family/`, data);
};

export const getSegments = (): Promise<AxiosResponse<any, any>> => {
  return axiosInstance.post(`${MASTER_API_CONSTANT}/unspsc/segment/`);
};
export const getClasses = (): Promise<AxiosResponse<any, any>> => {
  return axiosInstance.post(`${MASTER_API_CONSTANT}/unspsc/class/`);
};
export const getCommodies = (): Promise<AxiosResponse<any, any>> => {
  return axiosInstance.post(`${MASTER_API_CONSTANT}/unspsc/commodity/`);
};
export const getFamilies = (): Promise<AxiosResponse<any, any>> => {
  return axiosInstance.post(`${MASTER_API_CONSTANT}/unspsc/family/`);
};
