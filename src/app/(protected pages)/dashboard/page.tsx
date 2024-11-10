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
import { stocksColumns } from "@/app/(protected pages)/dashboard/table-columns";

const DashboardPage = () => {
  const [filter, setFilter] = useState({
    type: "",
    searchKeyword: "",
  });
  return (
    <div className="px-8 pt-10 grid gap-3 ">
      <header className="flex flex-col gap-2">
        <h2 className="font-semibold text-white text-2xl">Available Stocks</h2>
        <p className="text-white text-lg">Database for all Available Stocks</p>
      </header>
      <div className="p-4 flex items-center justify-between bg-white rounded-md gap-5 shadow-md">
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
      </div>
      <div className="p-4 grid gap-4 bg-white rounded-md shadow-md">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-lg">Your Available Stocks Report</p>
          <div className="flex items-center gap-2">
            <Button className="p-2" variant={"outline"}>
              <Logs size={26} />
            </Button>
            <Button asChild variant={"tertiary"}>
              <Link href={"/stock-in"}>Stock In</Link>
            </Button>
          </div>
        </div>
        <DataTable data={[]} columns={stocksColumns} />
      </div>
    </div>
  );
};

export default DashboardPage;
