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
import { Loader, Logs, Share } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { vendorListColumns } from "./vendorListColumns";
import { useQuery } from "@tanstack/react-query";
import { getVendors } from "@/api/masterdata/vendor";
import { masterApiQuery } from "@/react-query/masterApiQueries";
import { dummyVendors } from "@/utils/constants";

const VendorsListPage = () => {
  const [filter, setFilter] = useState({
    type: "all",
    searchKeyword: "",
  });

  const { data: vendors, isLoading } = useQuery({
    queryKey: [masterApiQuery.vendor.getVendors.Key],
    queryFn: getVendors,
  });

  return (
    <>
      <Header
        title="Vendors"
        description="All Vendors available on platform."
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
              <Link href={"/vendors/add"}>Add Vendor</Link>
            </Button>
          </div>
        </div>

        <DataTable
          isLoading={isLoading}
          // data={vendors || []}
          data={dummyVendors || []}
          columns={vendorListColumns}
        />
      </Container>
    </>
  );
};

export default VendorsListPage;
