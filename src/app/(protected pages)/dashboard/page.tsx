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
import Header from "@/components/globals/Header";
import Container from "@/components/globals/Container";

const DashboardPage = () => {
  const [filter, setFilter] = useState({
    type: "all",
    searchKeyword: "",
  });

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
        <DataTable data={[]} columns={stocksColumns} />
      </Container>
    </>
  );
};

export default DashboardPage;
