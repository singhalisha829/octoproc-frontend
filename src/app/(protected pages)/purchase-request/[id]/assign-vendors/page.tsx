"use client";
import Container from "@/components/globals/Container";
import Header from "@/components/globals/Header";
import { DataTable } from "@/components/table/data-table";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { PurchaseRequest } from "@/interfaces/PurchaseRequest";
import { useParams, useRouter } from "next/navigation";
import { assignVendorColumns } from "./assign-vendors-columns";
import AssignVendorTable from "./AssignVendorTable";

const AssignVendors = () => {
  const params = useParams<{
    id: string;
  }>();
  const router = useRouter();
  const [purchaseRequest, setPurchaseRequest] = useState<PurchaseRequest>({
    id: 1,
    name: "Demo purchase request",
    items: [
      {
        unitPrice: 20,
        quantity: 20,
        productName: "item",
        quantityUnit: "V",
        productId: 2,
        assignedVendors: [
          
          { id: 1, // vendor_id, vendor_name, qunatity, assignmentID
           name: "Demo Vendor", quantity: 20 }],
      },
      {
        unitPrice: 30,
        quantity: 10,
        productName: "item2",
        quantityUnit: "Kg",
        productId: 4,
      },
    ],
    vendors: [{ id: 1, name: "Demo Vendor", quantity: 20 }],
  });

  return (
    <>
      <Header title={params?.id} description="" />
      <Container className="grid gap-2">
        <p className="text-xl font-semibold">Items:</p>
        <AssignVendorTable
          data={purchaseRequest.items}
          columns={assignVendorColumns}
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
            router.push(`/purchase-request/${purchaseRequest.id}/view-vendors`);
          }}
          size={"lg"}
          variant={"tertiary"}
        >
          Create Purchase Request
        </Button>
      </Container>
    </>
  );
};

export default AssignVendors;
