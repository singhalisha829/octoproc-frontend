import { axiosInstance } from "@/api/axiosInstance";
import { masterApiQuery } from "@/react-query/masterApiQueries";

export const getCountriesList = async () => {
  const { data } = await axiosInstance.get(
    masterApiQuery.country.getCountries.endpoint
  );
  return data.data;
};
export const getCitites = async () => {
  const { data } = await axiosInstance.get(
    masterApiQuery.city.getCities.endpoint
  );
  return data.data;
};
export const getStates = async () => {
  const { data } = await axiosInstance.get(
    masterApiQuery.state.getStates.endpoint
  );
  return data.data;
};
