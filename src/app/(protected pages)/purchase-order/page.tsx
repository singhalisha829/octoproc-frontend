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
import React, { useState } from "react";

import Header from "@/components/globals/Header";
import Container from "@/components/globals/Container";
import { purchaseRequestColumns } from "./purchase-table-columns";
import { PurchaseRequest } from "@/interfaces/PurchaseRequest";

const PurchaseRequestPage = () => {
  const [filter, setFilter] = useState({
    type: "all",
    searchKeyword: "",
  });
  const [purchaseRequests, setPurchaseRequests] = useState<PurchaseRequest[]>([
    {
      id: 1,
      name: "Demo purchase request",
      items: [
        {
          unitPrice: 20,
          quantity: 20,
          partName: "item",
          partId: 2,
        },
      ],
      vendors: [{ id: 1, name: "vendor", quantity: 20 }],
    },
    {
      id: 2,
      name: "Demo purchase request 2",
      items: [
        {
          unitPrice: 20,
          quantity: 20,
          partName: "item",
          partId: 2,
        },
      ],
      vendors: [],
    },
  ]);

  // p-order table columns
  // po-no ,date, vendor, value/amount, Status,

  // po schema from backend
  /*
    id int [primary key]
    vendor_id foreign key
    purchase_order_no
    total_amount decimal
    date Date
    Terms_and_condition json
    Status [enum]
*/
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
        <DataTable data={purchaseRequests} columns={purchaseRequestColumns} />
      </Container>
    </>
  );
};

export default PurchaseRequestPage;
