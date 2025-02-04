"use client";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Share } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

import { getPurchaseRequests } from "@/api/purchaseRequest";
import Container from "@/components/globals/Container";
import Header from "@/components/globals/Header";
import { purchaseRequestQueries } from "@/react-query/purchaseRequest";
import { useQuery } from "@tanstack/react-query";
import { purchaseRequestColumns } from "./purchase-table-columns";
import { useClient } from "@/contexts/ClientContext";

const PurchaseRequestPage = () => {
    const { selectedClient } = useClient();
  const [filter, setFilter] = useState<{
    type: string;
    searchKeyword: string;
    enterprise_client_ids: number[];
  }>({
    type: "all",
    searchKeyword: "",
    enterprise_client_ids:selectedClient?[selectedClient]:[]
  });

   useEffect(() => {
      setFilter((prev) => ({
        ...prev,
        enterprise_client_ids: selectedClient?[selectedClient]:[],
      }));
    }, [selectedClient]);

  const { data } = useQuery({
    queryKey: [
      purchaseRequestQueries.purchaseRequest.getPurchaseRequests.key,
      filter.enterprise_client_ids
    ],
    queryFn: () => getPurchaseRequests({enterprise_client_ids:filter.enterprise_client_ids}),
  });

  return (
    <>
      <Header
        title="Purchase Requests"
        description="Database for all Purchase Requests"
      />
      <Container className=" flex items-center justify-between  gap-5">
        <div className="flex items-center gap-4 grow">
          <Select
            value={filter.type}
            onValueChange={(value) =>
              setFilter((prev) => ({ ...prev, type: value }))
            }
            defaultValue="all"
          >
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
          <Input
            value={filter.searchKeyword}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, searchKeyword: e.target.value }))
            }
            placeholder="Search..."
            className="max-w-screen-lg"
          />
        </div>
        <Button variant={"ghost"} size={"lg"}>
          Export <Share />
        </Button>
      </Container>
      <Container className="grid gap-4 ">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-lg">
            Your Available Purchase Requests
          </p>
          <div className="flex items-center gap-2">
            <Button asChild variant={"tertiary"}>
              <Link href={"/purchase-request/action/create"}>
                Create Purchase Request
              </Link>
            </Button>
          </div>
        </div>
        <DataTable
          data={data || []}
          columns={purchaseRequestColumns}
          onRowClick={(row) => {
            return `/purchase-request/${row.original.id}/assign-vendors`;
          }}
        />
      </Container>
    </>
  );
};

export default PurchaseRequestPage;
