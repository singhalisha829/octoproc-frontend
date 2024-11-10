"use client";
import Container from "@/components/globals/Container";
import Header from "@/components/globals/Header";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/DatePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircleCheck, Trash, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type Item = {
  unitPrice: number;
  quantity: Number;
  partName: string;
  partId: number | string;
};

export type Stock = {
  invoiceNumber: string;
  vendor: string;
  date: string;
  items: Item[];
};

const HEADERS = ["Part ID", "Part Name", "Unit Price", "Quantity"];

const StockInPage = () => {
  const router = useRouter();
  const [stock, setStock] = useState<Stock>({
    invoiceNumber: "",
    vendor: "",
    date: "",
    items: [
      {
        partId: 1,
        partName: "test",
        quantity: 10,
        unitPrice: 10,
      },
    ],
  });

  return (
    <>
      <Header title="Stock In" description="Add New Parts to Stock" />
      <Container className="grid gap-4">
        <p className="text-lg font-semibold">Your Stock in Items</p>
        <div className="grid grid-cols-3 gap-5">
          <div className="grid gap-1.5">
            <Label
              htmlFor="invoice number"
              className="font-semibold text-gray-700"
            >
              Invoice Number:
            </Label>
            <Input id="invoice number" placeholder="Enter Invoice Number" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="vendor" className="font-semibold text-gray-700">
              Vendor:
            </Label>
            <Input id="vendor" placeholder="Search Vendor" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="Date" className="font-semibold text-gray-700">
              Date:
            </Label>
            <DatePicker />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="grid grid-cols-5">
              {HEADERS.map((header) => (
                <TableHead
                  className="flex items-center justify-center text-center"
                  key={header}
                >
                  {header}
                </TableHead>
              ))}
              <TableHead className="flex items-center justify-center text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="grid grid-cols-5">
              <TableCell></TableCell>

              <TableCell className="flex items-center justify-center text-center">
                <Input placeholder="Enter Part ID/Name" />
              </TableCell>

              <TableCell className="flex items-center justify-center text-center">
                <Input
                  placeholder="0.00"
                  type="number"
                  className="max-w-[180px]"
                />
              </TableCell>

              <TableCell className="flex items-center justify-center text-center">
                <Input placeholder="0.00" type="number" />
              </TableCell>

              <TableCell className="flex gap-4 items-center justify-center text-center">
                <button
                  className="bg-green-500 rounded-full hover:bg-green-600"
                  onClick={(e) => e.stopPropagation()}
                >
                  <CircleCheck color="white" size={30} />
                </button>
                <button
                  className="bg-red-500 rounded-full hover:bg-red-600 p-[2px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <X color="white" size={24} />
                </button>
              </TableCell>
            </TableRow>
            {stock.items.map((item) => (
              <TableRow key={item.partId} className="grid grid-cols-5">
                <TableCell></TableCell>

                <TableCell className="flex items-center justify-center text-center">
                  {item?.partName}
                </TableCell>

                <TableCell className="flex items-center justify-center text-center">
                  {item?.unitPrice}
                </TableCell>

                <TableCell className="flex items-center justify-center text-center">
                  {String(item?.quantity)}
                </TableCell>

                <TableCell className="flex gap-4 items-center justify-center text-center">
                  <button
                    className="bg-red-500 rounded-full hover:bg-red-600 p-1.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Trash color="white" size={20} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
      <Container className="fixed bottom-0 left-[320px] right-0 shadow-inner flex rounded-none items-center justify-end gap-2">
        <Button
          onClick={() => {
            router.back();
          }}
          variant={"secondary"}
          size={"lg"}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            router.back();
          }}
          size={"lg"}
          variant={"default"}
        >
          Save
        </Button>
      </Container>
    </>
  );
};

export default StockInPage;
