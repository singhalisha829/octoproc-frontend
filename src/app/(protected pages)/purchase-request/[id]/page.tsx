"use client";
import Container from "@/components/globals/Container";
import Header from "@/components/globals/Header";
import { DataTable } from "@/components/table/data-table";
import { useState } from "react";

import { PurchaseRequest } from "@/interfaces/PurchaseRequest";
import { useParams } from "next/navigation";
import { viewPrColumns } from "./view-pr-columns";

const ViewItems = () => {
  const params = useParams<{
    purchaseRequestId: string;
  }>();
  const [purchaseRequest, setPurchaseRequest] = useState<PurchaseRequest>({
    id: 1,
    name: "Demo purchase request",
    items: [
      {
        unitPrice: 20,
        quantity: 20,
        partName: "item",
        quantityUnit: "",
        partId: 2,
      },
      {
        unitPrice: 20,
        quantity: 20,
        partName: "item",
        quantityUnit: "",
        partId: 3,
      },
    ],
    vendors: [{ id: 1, name: "Demo Vendor", quantity: 20 }],
  });

  return (
    <>
      <Header title={params?.purchaseRequestId} description="" />
      <Container className="grid gap-2">
        <p className="text-xl font-semibold">Items:</p>
        <DataTable data={purchaseRequest.items} columns={viewPrColumns} />
      </Container>
    </>
  );
};

export default ViewItems;
