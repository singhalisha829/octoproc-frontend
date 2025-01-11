"use client";
import Container from "@/components/globals/Container";
import Header from "@/components/globals/Header";
import { DataTable } from "@/components/table/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { viewVendorColumns } from "./view-vendor-columns";

const ViewVendorsPage = () => {
  return (
    <>
      <Header title="View Assigned Vendors" description="" />

      {[
        { id: 1, name: "Demo Vendor", quantity: 20 },
        {
          id: 2,
          name: "ABC PVT LTD",
          quantity: 10,
        },
      ].map((vendor) => (
        <Container className="grid gap-4 " key={vendor.id}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="font-bold text-lg">{vendor.name}</p>
              <Badge variant={"tertiary"}>Partially Processed</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant={"tertiary"}>
                {/* 
                
                TODO: request quotation-> wait -> quotation recieved ->table columns unit price, total price -> accept/reject quotation -> if accept  generete po and send to vendor

                */}

                <Link href={"/purchase-request"}>Request Quotation</Link>
              </Button>
            </div>
          </div>
          <DataTable
            data={[
              {
                unitPrice: 20,
                quantity: 20,
                productName: "item",
                productId: 2,
              },
              {
                unitPrice: 20,
                quantity: 20,
                productName: "item",
                productId: 4,
              },
            ]}
            columns={viewVendorColumns}
          />
        </Container>
      ))}
    </>
  );
};

export default ViewVendorsPage;
