"use client";
import Container from "@/components/globals/Container";
import Header from "@/components/globals/Header";
import StockTable from "@/components/StockPagesComponents/StockTable";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { Item } from "@/interfaces/Stock";
import { PurchaseRequest } from "@/interfaces/PurchaseRequest";

const CreatePurchaseRequestPage = () => {
  const router = useRouter();
  const { type } = useParams<{
    type: string;
  }>();
  const [purchaseRequest, setPurchaseRequest] = useState<PurchaseRequest>({
    id: 1,
    name: "Demo purchase request",
    items:
      type === "edit"
        ? [
            {
              unitPrice: 20,
              quantity: 20,
              partName: "item",
              quantityUnit: "V",
              partId: 4,
            },
            {
              unitPrice: 30,
              quantity: 10,
              partName: "item2",
              quantityUnit: "Kg",
              partId: 2,
            },
          ]
        : [],
    vendors: [{ id: 1, name: "Demo Vendor", quantity: 20 }],
  });

  const addItem = useCallback((item: Item) => {
    setPurchaseRequest((prev) => ({ ...prev, items: [...prev.items, item] }));
  }, []);

  const deleteItem = useCallback((item: Item) => {
    const items = [...purchaseRequest.items];

    setPurchaseRequest((prev) => ({
      ...prev,
      items: items.filter((i) => i.partId !== item.partId),
    }));
  }, []);
  return (
    <>
      <Header
        title="Purchase Request"
        description="Add New Parts to Purchase Request"
      />
      <Container className="grid gap-4">
        <p className="text-lg font-semibold">Your Purchase Request Items</p>

        <StockTable
          items={purchaseRequest.items}
          addItem={addItem}
          deleteItem={deleteItem}
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
            router.push(
              `/purchase-request/${purchaseRequest.id}/assign-vendors`
            );
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
