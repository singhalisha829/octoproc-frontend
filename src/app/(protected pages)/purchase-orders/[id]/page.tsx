"use client";
import Container from "@/components/globals/Container";
import Header from "@/components/globals/Header";

import AssignVendorTable from "@/app/(protected pages)/purchase-request/[id]/assign-vendors/AssignVendorTable";
import { viewPrColumns } from "@/app/(protected pages)/purchase-request/[id]/view-pr-columns";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

const ViewItems = () => {
  const params = useParams<{
    purchaseRequestId: string;
  }>();
  const router = useRouter();

  // items table -> show the relevent columns based on the backend schema (may change)

  return (
    <>
      <Header title={params?.purchaseRequestId} description="" />
      <Container className="grid gap-2">
        <p className="text-xl font-semibold">Items:</p>
        <AssignVendorTable data={[]} columns={viewPrColumns} />
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
