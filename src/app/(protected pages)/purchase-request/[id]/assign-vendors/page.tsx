"use client";
import Container from "@/components/globals/Container";
import Header from "@/components/globals/Header";

import {
  getItemWiseAssignedVendors,
  getPurchaseRequest,
} from "@/api/purchaseRequest";
import { Button } from "@/components/ui/button";
import { formatItems } from "@/lib/utils";
import { purchaseRequestQueries } from "@/react-query/purchaseRequest";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { assignVendorColumns } from "./assign-vendors-columns";
import AssignVendorTable from "./AssignVendorTable";

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
              `/purchase-request/${purchaseRequest?.id}/view-vendors`
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

export default AssignVendors;
