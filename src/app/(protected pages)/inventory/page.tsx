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
import { Logs, Share } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { inventoryColumns } from "@/app/(protected pages)/inventory/table-columns";
import Header from "@/components/globals/Header";
import Container from "@/components/globals/Container";
import { useQuery } from "@tanstack/react-query";
import { getInventories } from "@/api/inventory";
import { enterpriseQueries } from "@/react-query/enterpriseQueries";
import { getWarehouses } from "@/api/enterprise";
import { useClient } from "@/contexts/ClientContext";

const stocks = [
  {
    id: 1,
    type: "Metal",
    name: "Iron Rod",
    description: "High-strength iron rod used for construction.",
    quantity: "10 M",
  },
  {
    id: 2,
    type: "Wood",
    name: "Pine Plank",
    description: "Smooth pine wood plank for furniture making.",
    quantity: "10 Kg",
  },
  {
    id: 3,
    type: "Plastic",
    name: "PVC Pipe",
    description: "Durable PVC pipe for plumbing applications.",
    quantity: "15 Kg",
  },
  {
    id: 4,
    type: "Metal",
    name: "Aluminum Sheet",
    description: "Lightweight aluminum sheet for industrial use.",
    quantity: "25 Kg",
  },
  {
    id: 5,
    type: "Wood",
    name: "Oak Beam",
    description: "Sturdy oak beam for structural support.",
    quantity: "12 Kg",
  },
  {
    id: 6,
    type: "Glass",
    name: "Tempered Glass Panel",
    description: "Scratch-resistant tempered glass for windows.",
    quantity: "30 M",
  },
  {
    id: 7,
    type: "Metal",
    name: "Copper Wire",
    description: "Conductive copper wire for electrical installations.",
    quantity: "50 M",
  },
  {
    id: 8,
    type: "Plastic",
    name: "Polyethylene Sheet",
    description: "Flexible polyethylene sheet for packaging.",
    quantity: "18 M",
  },
  {
    id: 9,
    type: "Wood",
    name: "Birch Veneer",
    description: "Thin birch veneer for decorative paneling.",
    quantity: "22 Kg",
  },
  {
    id: 10,
    type: "Metal",
    name: "Steel Bolt",
    description: "Heavy-duty steel bolt for machinery assembly.",
    quantity: "40 kg",
  },
];

const DashboardPage = () => {
  const { selectedClient } = useClient();
  const [filter, setFilter] = useState<{
    type: string;
    searchKeyword: string;
    enterprise_client_id: number | null;
    warehouses: number[];
  }>({
    type: "all",
    searchKeyword: "",
    enterprise_client_id: selectedClient,
    warehouses: [],
  });

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      enterprise_client_id: selectedClient,
    }));
  }, [selectedClient]);

  const { data: inventories } = useQuery({
    queryKey: [
      "inventories",
      filter.enterprise_client_id,
      filter.warehouses?.length,
    ],
    queryFn: () =>
      getInventories({ enterprise_client_id: filter.enterprise_client_id }),
    enabled: !!filter.enterprise_client_id,
  });
  
  const { data: warehouses } = useQuery({
    queryKey: [enterpriseQueries.warehouse.getWarehouses.key],
    queryFn: () =>
      getWarehouses({
        enterprise_client_id: filter.enterprise_client_id,
      }),
    enabled: !!filter.enterprise_client_id,
  });

  const items = inventories
    ?.map((inventory) => inventory.items)
    .flatMap((item) => item);

  console.log(items);

  return (
    <>
      <Header
        title="Available Stocks"
        description="Database for all Available Stocks"
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
          <p className="font-semibold text-lg">Your Available Stocks Report</p>
          <div className="flex items-center gap-2">
            {/* <SelectWithLabel
              value={filter.warehouses[0] || ""}
              onSelect={(option) => {
                setFilter((prev) => ({
                  ...prev,
                  warehouses: option ? [Number(option.value)] : [],
                }));
              }}
              id={"Warehouse"}
              className="max-w-full"
              // labelText={"Client"}
              searchPlaceholder={`Search Warehouse`}
              placeholder={"Select Warehouse"}
              options={transformSelectOptions(warehouses, "id", "name") || []}
              emptyLabel={`No Warehouse found`}
              valueKey="value"
              labelKey="label"
            /> */}
            <Button className="p-2" variant={"outline"}>
              <Logs size={26} />
            </Button>
            <Button asChild variant={"tertiary"}>
              <Link href={"/stock-in"}>Stock In</Link>
            </Button>
            <Button asChild variant={"tertiary"}>
              <Link href={"/stock-out"}>Stock Out</Link>
            </Button>
          </div>
        </div>
        {/* give onRowCLick and rediect to clicked item ledger (page to show this)*/}
        <DataTable data={items || []} columns={inventoryColumns} />
      </Container>
    </>
  );
};

export default DashboardPage;
