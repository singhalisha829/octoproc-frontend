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
import { ComboBox } from "@/components/ui/ComboBox";
import { PARTS, STATUSES, UNITS } from "@/utils/constants";

const LedgerPage = () => {
  const [filter, setFilter] = useState({
    type: "all",
    searchKeyword: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  const [ledgers, setLedgers] = useState([
    {
      id: 1,
      type: "Production Return",
      partId: "INVC0070135",
      date: "2024-11-10",
      quantity: 2000,
      balanceQuantiy: 1200,
      documentId: 12,
      createdBy: "techpix",
    },
    {
      id: 2,
      type: "Sales Return",
      partId: "INVC0070136",
      date: "2024-11-12",
      quantity: 500,
      balanceQuantiy: 300,
      documentId: 13,
      createdBy: "admin",
    },
    {
      id: 3,
      type: "Production Return",
      partId: "INVC0070137",
      date: "2024-11-15",
      quantity: 1000,
      balanceQuantiy: 400,
      documentId: 14,
      createdBy: "johndoe",
    },
    {
      id: 4,
      type: "Sales Return",
      partId: "INVC0070138",
      date: "2024-11-18",
      quantity: 750,
      balanceQuantiy: 750,
      documentId: 15,
      createdBy: "techpix",
    },
    {
      id: 5,
      type: "Production Return",
      partId: "INVC0070139",
      date: "2024-11-20",
      quantity: 1500,
      balanceQuantiy: 1000,
      documentId: 16,
      createdBy: "admin",
    },
    {
      id: 6,
      type: "Purchase Return",
      partId: "INVC0070140",
      date: "2024-11-22",
      quantity: 200,
      balanceQuantiy: 200,
      documentId: 17,
      createdBy: "johndoe",
    },
    {
      id: 7,
      type: "Production Return",
      partId: "INVC0070141",
      date: "2024-11-24",
      quantity: 1200,
      balanceQuantiy: 600,
      documentId: 18,
      createdBy: "techpix",
    },
    {
      id: 8,
      type: "Sales Return",
      partId: "INVC0070142",
      date: "2024-11-26",
      quantity: 800,
      balanceQuantiy: 400,
      documentId: 19,
      createdBy: "admin",
    },
    {
      id: 9,
      type: "Production Return",
      partId: "INVC0070143",
      date: "2024-11-28",
      quantity: 950,
      balanceQuantiy: 450,
      documentId: 20,
      createdBy: "techpix",
    },
    {
      id: 10,
      type: "Purchase Return",
      partId: "INVC0070144",
      date: "2024-11-30",
      quantity: 300,
      balanceQuantiy: 100,
      documentId: 21,
      createdBy: "johndoe",
    },
  ]);
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
        )}
        <DataTable data={ledgers} columns={ledgerColumns} />
      </Container>
    </>
  );
};

export default LedgerPage;
