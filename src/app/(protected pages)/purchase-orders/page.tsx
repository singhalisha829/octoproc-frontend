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
import { useState } from "react";

import { purchaseRequestColumns } from "@/app/(protected pages)/purchase-request/purchase-table-columns";
import Container from "@/components/globals/Container";
import Header from "@/components/globals/Header";

const PurchaseRequestPage = () => {
  const [filter, setFilter] = useState({
    type: "all",
    searchKeyword: "",
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
        <DataTable data={[]} columns={purchaseRequestColumns} />
      </Container>
    </>
  );
};

export default PurchaseRequestPage;
