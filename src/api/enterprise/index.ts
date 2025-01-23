import { Client, ClientDetailApiResponse, ClientDetails, Warehouse } from "@/interfaces/Client";
import { enterpriseQueries } from "@/react-query/enterpriseQueries";
import { axiosInstance } from "../axiosInstance";

export const getClients = async (): Promise<Client[]> => {
  const { data } = await axiosInstance.post(
    enterpriseQueries.client.getClients.endpoint,
    { country_ids: [], state_id: [], city_id: [], pan_number: "" }
  );
  return data?.data || null;
};

export const getClient = async (id: string): Promise<ClientDetailApiResponse> => {
  const { data } = await axiosInstance.get(
    enterpriseQueries.client.getClient.endpoint + id
  );
  return data?.data || null;
};
export const addClient = async (data: ClientDetails): Promise<ClientDetails> => {
  return await axiosInstance.post(
    enterpriseQueries.client.addClient.endpoint,
    data
  );
};
export const updateClient = async (data: ClientDetails): Promise<ClientDetails> => {
  return await axiosInstance.post(
    enterpriseQueries.client.addClient.endpoint,
    data
  );
};


export const addWarehouse = async (data: Warehouse) => {
  return await axiosInstance.post(enterpriseQueries.warehouse.addWarehouse.endpoint, data)
}
export const getWarehouses = async ({
  enterprise_client_id,
  name = "",
  address = "",
  city_ids = [],
  state_ids = []
}: {
  enterprise_client_id: number | null
  name?: string
  address?: string
  city_ids?: number[]
  state_ids?: number[]
}): Promise<Warehouse[]> => {
  const { data } = await axiosInstance.post(enterpriseQueries.warehouse.getWarehouses.endpoint, { enterprise_client_id, name, address, city_ids, state_ids })
  return data?.data || null
}