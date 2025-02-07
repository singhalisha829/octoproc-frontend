"use client";
import Container from "@/components/globals/Container";
import Header from "@/components/globals/Header";

import {
  getItemWiseAssignedVendors,
  getPurchaseRequest,
  getVendorsAssignments,
} from "@/api/purchaseRequest";
import { getPurchaseOrders } from "@/api/purchaseRequest/purchaseOrder";
import { Button } from "@/components/ui/button";
import { formatItems, insertQoutationDetailsInVendorAssignment } from "@/lib/utils";
import { purchaseRequestQueries } from "@/react-query/purchaseRequest";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { assignVendorColumns } from "./assign-vendors-columns";
import AssignVendorTable from "./AssignVendorTable";
import Assigment from "../view-vendors/Assigment";
import { DataTable } from "@/components/table/data-table";
import { purchaseOrderColumns } from "@/app/(protected pages)/purchase-orders/purchase-order-columns";

const AssignVendors = () => {
  const params = useParams<{
    id: string;
  }>();
  const router = useRouter();

  const { data: purchaseRequest } = useQuery({
    queryKey: [
      purchaseRequestQueries.purchaseRequest.getPurchaseRequest.key,
      params.id,
    ],
    queryFn: () => getPurchaseRequest(params.id),
    enabled: !!params.id,
  });

  const { data: itemWiseAssignedVendors } = useQuery({
    queryKey: [
      purchaseRequestQueries.purchaseRequest.getItemWiseAssignedVendor.key,
      params.id,
    ],
    queryFn: () => getItemWiseAssignedVendors(params.id),
    enabled: !!params.id,
  });

  const formattedItems = formatItems(
    itemWiseAssignedVendors
      ? itemWiseAssignedVendors?.items || []
      : purchaseRequest?.items || []
  );

   const { data: vendorAssignments } = useQuery({
     queryKey: [
       purchaseRequestQueries.purchaseRequest.getVendorsAssignments.key,
       params.id,
      ],
      queryFn: () => getVendorsAssignments(params.id),
      enabled: !!params.id,
    });

    const formattedAssignment = insertQoutationDetailsInVendorAssignment(vendorAssignments ?? []);
    console.log('formattedAssignment', formattedAssignment);

    const { data: purchaseOrders } = useQuery({
        queryKey: [
          purchaseRequestQueries.purchaseRequest.getPurchaseOrder.key,
          params.id,
        ],
        queryFn: () => getPurchaseOrders({purchase_request_ids:[params.id]}),
      });

  return (
    <>
      <Header title={purchaseRequest?.reference_no || ""} description="" />
      <Container className="grid gap-2">
        <p className="text-xl font-semibold">Items:</p>
        <AssignVendorTable
          data={formattedItems}
          columns={assignVendorColumns}
        />
      </Container>

      <Container className="grid gap-4 " >
        <p className="text-xl font-semibold">Assigned Vendors:</p>
        
        {(formattedAssignment || [])?.map((vendorAssignment) => {
        return (
          <Assigment
            key={vendorAssignment.id}
            vendorAssignment={vendorAssignment}
          />
        );
      })}
      </Container>

      <Container className="grid gap-4 ">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-lg">
            Purchase Orders:
          </p>
        </div>
        <DataTable
          data={purchaseOrders || []}
          columns={purchaseOrderColumns}
          // onRowClick={(row) => {
          //   return `/purchase-orders/${row.original.id}`;
          // }}
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
      </Container>

    </>
  );
};

export default AssignVendors;
