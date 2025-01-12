"use client";
import Container from "@/components/globals/Container";
import Header from "@/components/globals/Header";

import { getPurchaseRequest } from "@/api/purchaseRequest";
import { Button } from "@/components/ui/button";
import { formatItems } from "@/lib/utils";
import { purchaseRequestQueries } from "@/react-query/purchaseRequest";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import AssignVendorTable from "./assign-vendors/AssignVendorTable";
import { viewPrColumns } from "./view-pr-columns";

const ViewItems = () => {
  const params = useParams<{
    id: string;
  }>();
  const router = useRouter();

  const { data: purchaseRequest } = useQuery({
    queryKey: [purchaseRequestQueries.purchaseRequest.getPurchaseRequest.key],
    queryFn: () => getPurchaseRequest(params.id),
    enabled: !!params.id,
  });

  const formattedItems = formatItems(purchaseRequest?.items || []);

  return (
    <>
      <Header title={purchaseRequest?.reference_no || ""} description="" />
      <Container className="grid gap-2">
        <p className="text-xl font-semibold">Items:</p>
        <AssignVendorTable data={formattedItems} columns={viewPrColumns} />
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
            router.push(`/purchase-request/${params?.id}/view-vendors`);
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
