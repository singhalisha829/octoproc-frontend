import { axiosInstance } from "@/api/axiosInstance";
import { MASTER_API_CONSTANT } from "@/api/masterdata";

export const getCountriesList = async () => {
  const { data } = await axiosInstance.get(`${MASTER_API_CONSTANT}/country/`);
  return data;
};
export const getCitites = async () => {
  const { data } = await axiosInstance.get(`${MASTER_API_CONSTANT}/city/`);
  return data;
};
export const getStates = async () => {
  const { data } = await axiosInstance.get(`${MASTER_API_CONSTANT}/state/`);
  return data;
};
