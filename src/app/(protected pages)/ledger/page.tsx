"use client";
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
import { Share } from "lucide-react";
import { useState } from "react";
import { ledgerColumns } from "@/app/(protected pages)/ledger/ledger-columns";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/DatePicker";

const LedgerPage = () => {
  const [filter, setFilter] = useState({
    type: "all",
    searchKeyword: "",
  });
  const [isAdding, setIsAdding] = useState(false);
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
          <Button
            onClick={() => setIsAdding((prev) => !prev)}
            variant={"tertiary"}
          >
            {isAdding ? "Cancel" : "Add"}
          </Button>
        </div>

        {isAdding && (
          <div className="p-5 grid gap-3">
            <div className="grid grid-cols-3 gap-5">
              <div className="grid gap-1.5">
                <Label htmlFor="status" className="font-semibold text-gray-700">
                  Status:
                </Label>
                <Input id="status" placeholder="Search Status" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="Part" className="font-semibold text-gray-700">
                  Part:
                </Label>
                <Input id="Part" placeholder="Search Part ID/Name" />
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
                <Input id="Quantity" type="number" placeholder="0.00" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-4">
              <Button variant={"outline"}>Cancel</Button>
              <Button variant={"tertiary"}>Save</Button>
            </div>
          </div>
        )}
        <DataTable data={[]} columns={ledgerColumns} />
      </Container>
    </>
  );
};

export default LedgerPage;
