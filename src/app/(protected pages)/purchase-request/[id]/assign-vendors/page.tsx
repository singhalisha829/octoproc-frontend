"use client";
import Container from "@/components/globals/Container";
import Header from "@/components/globals/Header";

import {
  getItemWiseAssignedVendors,
  getPurchaseRequest,
} from "@/api/purchaseRequest";
import { Button } from "@/components/ui/button";
import { PurchaseRequestItem } from "@/interfaces/PurchaseRequest";
import { Item } from "@/interfaces/Stock";
import { purchaseRequestQueries } from "@/react-query/purchaseRequest";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { assignVendorColumns } from "./assign-vendors-columns";
import AssignVendorTable from "./AssignVendorTable";

const formatItems = (items: PurchaseRequestItem[]): Item[] => {
  if (!items) return [];
  const formattedItems: Item[] = items.map((item) => ({
    quantity: item.quantity,
    unitPrice: 0,
    productId: item.product.id,
    productName: item.product.name,
    uom_id: item.product.uom_id,
    id: item.id,
  }));
  if (formattedItems) return formattedItems;
  return [];
};

const AssignVendors = () => {
  const params = useParams<{
    id: string;
  }>();
  const router = useRouter();

  const { data: purchaseRequest } = useQuery({
    queryKey: [purchaseRequestQueries.purchaseRequest.getPurchaseRequest.key],
    queryFn: () => getPurchaseRequest(params.id),
  });

  const { data: itemWiseAssignedVendors } = useQuery({
    queryKey: [
      purchaseRequestQueries.purchaseRequest.getItemWiseAssignedVendor.key,
    ],
    queryFn: () => getItemWiseAssignedVendors(params.id),
  });

  const formattedItems = formatItems(purchaseRequest?.items || []);

  return (
    <>
      <Header title={params?.id} description="" />
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
