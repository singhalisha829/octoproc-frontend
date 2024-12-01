import { axiosInstance } from "@/api/axiosInstance";
import { masterApiQuery } from "@/react-query/masterApiQueries";

export const getUomTypes = async () => {
  const { data } = await axiosInstance.get(
    masterApiQuery.uom.getUomTypes.endpoint
  );
  return data.data;
};
export const getUoms = async (type: string | null) => {
  const { data } = await axiosInstance.get(
    masterApiQuery.uom.getUoms.endpoint + type
  );
  return data.data;
};
