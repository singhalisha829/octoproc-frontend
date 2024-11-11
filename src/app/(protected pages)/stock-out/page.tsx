"use client";
import Container from "@/components/globals/Container";
import Header from "@/components/globals/Header";
import StockTable from "@/components/StockPagesComponents/StockTable";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/DatePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Stock } from "@/interfaces/Stock";

import { useRouter } from "next/navigation";
import { useState } from "react";

const StockOutPage = () => {
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
      <Header title="Stock Out" description="Add New Parts to Stock" />
      <Container className="grid gap-4">
        <p className="text-lg font-semibold">Your Stock Out Items</p>
        <div className="grid grid-cols-3 gap-5">
          <div className="grid gap-1.5">
            <Label htmlFor="Purpose" className="font-semibold text-gray-700">
              Purpose:
            </Label>
            <Input id="Purpose" placeholder="Enter Purpose." />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="req id" className="font-semibold text-gray-700">
              Request Id:
            </Label>
            <Input id="req id" placeholder="Enter Request ID" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="Date" className="font-semibold text-gray-700">
              Date:
            </Label>
            <DatePicker />
          </div>
        </div>
        <StockTable items={stock.items} />
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
          variant={"tertiary"}
        >
          Save
        </Button>
      </Container>
    </>
  );
};

export default StockOutPage;
