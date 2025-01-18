"use client";
import Container from "@/components/globals/Container";
import Header from "@/components/globals/Header";
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
import { Logs, Share } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { getClients } from "@/api/enterprise";
import { clientsListColumns } from "@/app/(protected pages)/client/clientListColumns";
import { enterpriseQueries } from "@/react-query/enterpriseQueries";
import { useQuery } from "@tanstack/react-query";

const ClientsListPage = () => {
  const [filter, setFilter] = useState({
    type: "all",
    searchKeyword: "",
  });

  const { data: clients, isLoading } = useQuery({
    queryKey: [enterpriseQueries.client.getClients.key],
    queryFn: getClients,
  });

  return (
    <>
      <Header
        title="Clients"
        description="All Clients available on platform."
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
              <SelectItem value="insulation2">Insulation Materials</SelectItem>
              <SelectItem value="stickers">Stickers</SelectItem>
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
          <p className="font-semibold text-lg">Your Available Clients List</p>
          <div className="flex items-center gap-2">
            <Button className="p-2" variant={"outline"}>
              <Logs size={26} />
            </Button>
            <Button asChild variant={"tertiary"}>
              <Link href={"/client/action/add"}>Add Client</Link>
            </Button>
          </div>
        </div>

        <DataTable
          isLoading={isLoading}
          data={clients || []}
          columns={clientsListColumns}
          onRowClick={(row) => {
            if (!row.original) return null;
            const id = row.original.id;
            return `/client/action/view?id=${id}`;
          }}
        />
      </Container>
    </>
  );
};

export default ClientsListPage;
