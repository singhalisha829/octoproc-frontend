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
import { useState } from "react";

import { getPurchaseOrders } from "@/api/purchaseRequest/purchaseOrder";
import Container from "@/components/globals/Container";
import Header from "@/components/globals/Header";
import { purchaseOrderQueries } from "@/react-query/purchaseOrderQueries";
import { dummyPO } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { purchaseOrderColumns } from "./purchase-order-columns";

const PurchaseRequestPage = () => {
  const [filter, setFilter] = useState({
    type: "all",
    searchKeyword: "",
  });

  const { data: purchaseOrders } = useQuery({
    queryKey: [purchaseOrderQueries.getPurchaseOrders.key],
    queryFn: () => getPurchaseOrders({}),
  });

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
        title="Purchase Orders"
        description="Database for all Purchase Orders"
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
            Your Available Purchase Orders
          </p>
          {/* <div className="flex items-center gap-2">
            <Button asChild variant={"tertiary"}>
              <Link href={"/purchase-request/action/create"}>
                Create Purchase Request
              </Link>
            </Button>
          </div> */}
        </div>
        <DataTable
          data={purchaseOrders || []}
          columns={purchaseOrderColumns}
          // onRowClick={(row) => {
          //   return `/purchase-orders/${row.original.id}`;
          // }}
        />
      </Container>
    </>
  );
};

export default PurchaseRequestPage;
