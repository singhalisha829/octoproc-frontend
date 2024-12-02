import { Client, ClientDetails } from "@/interfaces/Client";
import { enterpriseQueries } from "@/react-query/enterpriseQueries";
import { axiosInstance } from "../axiosInstance";

export const getClients = async (): Promise<Client[]> => {
  const { data } = await axiosInstance.post(
    enterpriseQueries.client.getClients.endpoint,
    { country_ids: [], state_id: [], city_id: [], pan_number: "" }
  );
  return data.data || null;
};
export const addClient = async (data: ClientDetails): Promise<Client[]> => {
  return await axiosInstance.post(
    enterpriseQueries.client.addClient.endpoint,
    data
  );
};
