"use client";
import { getClients } from "@/api/enterprise";
import { getLegders } from "@/api/inventory";
import { ledgerColumns } from "@/app/(protected pages)/ledger/ledger-columns";
import Container from "@/components/globals/Container";
import Header from "@/components/globals/Header";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/DateRangePicker";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectWithLabel from "@/components/ui/SelectWithLabel";
import { transformSelectOptions } from "@/lib/utils";
import { enterpriseQueries } from "@/react-query/enterpriseQueries";
import { useQuery } from "@tanstack/react-query";
import { Share } from "lucide-react";
import { useState } from "react";

const LedgerPage = () => {
  const [filter, setFilter] = useState<{
    type: string;
    searchKeyword: string;
    enterprise_client_id: number | null;
    warehouses: number[];
  }>({
    type: "all",
    searchKeyword: "",
    enterprise_client_id: null,
    warehouses: [],
  });
  // const [isAdding, setIsAdding] = useState(false);

  const { data: ledgers } = useQuery({
    queryKey: [
      "ledgers",
      filter.enterprise_client_id,
      filter.warehouses.length,
    ],
    queryFn: () =>
      getLegders({
        enterprise_client_id: filter.enterprise_client_id,
        pageNum: 1,
        pageSize: 100,
      }),

    enabled: !!filter.enterprise_client_id,
  });

  const { data: clients } = useQuery({
    queryKey: [enterpriseQueries.client.getClients.key],
    queryFn: () => getClients(),
  });

  return (
    <>
      <Header title="Ledger" description="Database for all Ledgers" />
      <Container className=" flex items-center justify-between  gap-5">
        <div className="flex items-center gap-4 grow">
          <DatePickerWithRange />
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
              <SelectItem value="all">All Transaction Types</SelectItem>
              <SelectItem value="stock-in">Stock In</SelectItem>
              <SelectItem value="stock-out">Stock Out</SelectItem>
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
          <p className="font-semibold text-lg">Your Transaction Details</p>
          <SelectWithLabel
            value={filter.enterprise_client_id || ""}
            onSelect={(option) => {
              setFilter((prev) => ({
                ...prev,
                enterprise_client_id: option ? Number(option.value) : null,
              }));
            }}
            id={"client"}
            className="max-w-full"
            // labelText={"Client"}
            searchPlaceholder={`Search Client`}
            placeholder={"Select Client"}
            options={transformSelectOptions(clients, "id", "name") || []}
            emptyLabel={`No Client found`}
            valueKey="value"
            labelKey="label"
          />
          {/* <Button
            onClick={() => setIsAdding((prev) => !prev)}
            variant={"tertiary"}
          >
            {isAdding ? "Cancel" : "Add"}
          </Button> */}
        </div>

        {/* {isAdding && (
          <div className="p-5 grid gap-3">
            <div className="grid grid-cols-3 gap-5">
              <div className="grid gap-1.5">
                <Label htmlFor="status" className="font-semibold text-gray-700">
                  Status:
                </Label>
                <ComboBox
                  searchPlaceholder="Search Status"
                  placeholder="Select Status"
                  options={STATUSES}
                  emptyLabel="No status found"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="Part" className="font-semibold text-gray-700">
                  Part:
                </Label>
                <ComboBox
                  searchPlaceholder="Search Part ID/Name"
                  placeholder="Select Part ID/Name"
                  options={PARTS}
                  emptyLabel="No part found"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="doc" className="font-semibold text-gray-700">
                  Document ID:
                </Label>
                <Input id="doc" placeholder="Enter Document ID" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="date" className="font-semibold text-gray-700">
                  Date:
                </Label>
                <DatePicker />
              </div>
              <div className="grid gap-1.5">
                <Label
                  htmlFor="Quantity"
                  className="font-semibold text-gray-700"
                >
                  Quantity:
                </Label>
                <div className="flex items-center">
                  <Input
                    className="rounded-r-none max-w-20"
                    id="Quantity"
                    type="number"
                    placeholder="0.00"
                  />
                  <ComboBox
                    className="rounded-l-none border-l-0"
                    searchPlaceholder="Search Unit"
                    placeholder="Select Unit"
                    options={UNITS}
                    emptyLabel="No unit found"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-4">
              <Button
                variant={"outline"}
                onClick={() => setIsAdding((prev) => !prev)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => setIsAdding((prev) => !prev)}
                variant={"tertiary"}
              >
                Save
              </Button>
            </div>
          </div>
        )} */}
        <DataTable data={ledgers || []} columns={ledgerColumns} />
      </Container>
    </>
  );
};

export default LedgerPage;
