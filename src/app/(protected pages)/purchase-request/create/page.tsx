"use client";
import Container from "@/components/globals/Container";
import Header from "@/components/globals/Header";
import StockTable from "@/components/StockPagesComponents/StockTable";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const CreatePurchaseRequestPage = () => {
  const router = useRouter();
  return (
    <>
      <Header
        title="Purchase Request"
        description="Add New Parts to Purchase Request"
      />
      <Container className="grid gap-4">
        <p className="text-lg font-semibold">Your Purchase Request Items</p>

        <StockTable
          items={[]}
          headers={[
            { label: "Part ID", value: "partId" },
            { label: "Part Name", value: "partName" },
            { label: "Quantity", value: "quantity" },
          ]}
        />
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

export default CreatePurchaseRequestPage;
