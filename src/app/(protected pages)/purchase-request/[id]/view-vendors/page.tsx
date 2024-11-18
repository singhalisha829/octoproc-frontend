"use client";
import Container from "@/components/globals/Container";
import Header from "@/components/globals/Header";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { PurchaseRequest } from "@/interfaces/PurchaseRequest";
import { useState } from "react";
import { viewVendorColumns } from "./view-vendor-columns";

const ViewVendorsPage = () => {
  const [purchaseRequest, setPurchaseRequest] = useState<PurchaseRequest>({
    id: 1,
    name: "Demo purchase request",
    items: [
      {
        unitPrice: 20,
        quantity: 20,
        partName: "item",
        partId: 2,
      },
      {
        unitPrice: 20,
        quantity: 20,
        partName: "item",
        partId: 4,
      },
    ],
    vendors: [
      { id: 1, name: "Demo Vendor", quantity: 20 },
      { id: 2, name: "Demo Vendor", quantity: 20 },
    ],
  });
  return (
    <>
      <Header title="View Assigned Vendors" description="" />

      {purchaseRequest.vendors.map((vendor) => (
        <Container className="grid gap-4 " key={vendor.id}>
          <div className="flex items-center justify-between">
            <p className="font-bold text-lg">{vendor.name}</p>
            <div className="flex items-center gap-2">
              <Button variant={"tertiary"}>
                {/* <Link href={"/#"}> */}
                Create Purchase Request
                {/* </Link> */}
              </Button>
            </div>
          </div>
          <DataTable data={purchaseRequest.items} columns={viewVendorColumns} />
        </Container>
      ))}
    </>
  );
};

export default ViewVendorsPage;
