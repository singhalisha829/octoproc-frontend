import { axiosInstance } from "@/api/axiosInstance";
import { GenericModalData } from "@/api/masterdata";
import { Class, Commodity, Family, UNSPSC } from "@/interfaces/Product";
import { masterApiQuery } from "@/react-query/masterApiQueries";

//create new api's
export const addSegment = (data: GenericModalData) => {
  return axiosInstance.post(masterApiQuery.segment.addSegment.endpoint, data);
};
export const addClass = (data: Class) => {
  return axiosInstance.post(masterApiQuery.class.addClass.endpoint, data);
};
export const addCommodity = (data: Commodity) => {
  return axiosInstance.post(
    masterApiQuery.commodity.addCommodity.endpoint,
    data
  );
};
export const addFamily = (data: Family) => {
  return axiosInstance.post(masterApiQuery.family.addFamily.endpoint, data);
};

//get list api's
export const getSegments = async (): Promise<UNSPSC[]> => {
  const { data } = await axiosInstance.get(
    masterApiQuery.segment.getSegments.endpoint
  );
  return data.data || null;
};

export const getFamilies = async (ids: number[]): Promise<Family[]> => {
  const { data } = await axiosInstance.post(
    masterApiQuery.family.getFamilies.endpoint,
    {
      segment_ids: ids,
    }
  );
  return data.data || null;
};
export const getClasses = async (ids: number[]): Promise<Class[]> => {
  const { data } = await axiosInstance.post(
    masterApiQuery.class.getClasses.endpoint,
    {
      family_ids: ids,
    }
  );
  return data.data || null;
};

export const getCommodies = async (ids: number[]): Promise<Commodity[]> => {
  const { data } = await axiosInstance.post(
    masterApiQuery.commodity.getCommodities.endpoint,
    {
      class_ids: ids,
    }
  );
  return data.data || null;
};
