"use client";
import Container from "@/components/globals/Container";
import Header from "@/components/globals/Header";
import { DataTable } from "@/components/table/data-table";
import { useState } from "react";

import { PurchaseRequest } from "@/interfaces/PurchaseRequest";
import { useParams, useRouter } from "next/navigation";
import { viewPrColumns } from "./view-pr-columns";
import { Button } from "@/components/ui/button";
import AssignVendorTable from "./assign-vendors/AssignVendorTable";

const ViewItems = () => {
  const params = useParams<{
    purchaseRequestId: string;
  }>();
  const router = useRouter();
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
        assignedVendors: [
          { id: 2, name: "Demo Vendor 2", quantity: 10 },
          { id: 10, name: "ABC PVT LTD", quantity: 10 },
        ],
      },
      {
        unitPrice: 20,
        quantity: 20,
        partName: "item",
        quantityUnit: "",
        partId: 3,
        assignedVendors: [{ id: 1, name: "Demo Vendor", quantity: 20 }],
      },
    ],
    vendors: [{ id: 1, name: "Demo Vendor", quantity: 20 }],
  });

  return (
    <>
      <Header title={params?.purchaseRequestId} description="" />
      <Container className="grid gap-2">
        <p className="text-xl font-semibold">Items:</p>
        <AssignVendorTable
          data={purchaseRequest.items}
          columns={viewPrColumns}
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
              `/purchase-request/${params?.purchaseRequestId}/view-vendors`
            );
          }}
          size={"lg"}
          variant={"tertiary"}
        >
          View Vendors
        </Button>
      </Container>
    </>
  );
};

export default ViewItems;
