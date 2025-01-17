"use client";
import { getClient } from "@/api/enterprise";
import Header from "@/components/globals/Header";
import { enterpriseQueries } from "@/react-query/enterpriseQueries";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const ClientDetailsPage = () => {
  const params = useParams<{ id: string }>();
  console.log(params.id);

  const { data: client, isLoading } = useQuery({
    queryKey: [enterpriseQueries.client.getClient.key],
    queryFn: () => getClient(params.id),
    enabled: !!params.id,
  });
  console.log(client);
  

  return (
    <>
      <Header title="Client Details" description="" />
    </>
  );
};

export default ClientDetailsPage;
