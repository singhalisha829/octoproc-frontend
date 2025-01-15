"use client";
import {
  acceptQuotation,
  getVendorsAssignments,
  rejectQuotation,
  requestQuotation,
} from "@/api/purchaseRequest";
import Container from "@/components/globals/Container";
import Header from "@/components/globals/Header";
import { DataTable } from "@/components/table/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { purchaseRequestQueries } from "@/react-query/purchaseRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { viewVendorColumns } from "./view-vendor-columns";
import { VendorAssignment } from "@/interfaces/PurchaseRequest";

function mergeItemsWithQuotations(vendorAssignment: VendorAssignment) {
  // Flatten all quotation items into a single array
  const allQuotationItems = vendorAssignment.quotations.flatMap((q) => q.items);

  // Map VendorAssignmentItem with its matching QuotationItem(s)
  const mergedItems = vendorAssignment.items.map((assignmentItem) => {
    // Find all quotation items matching this assignment item's id
    const matchingQuotationItems = allQuotationItems.filter(
      (quotationItem) => quotationItem.assignment_item_id === assignmentItem.id
    );

    // Add matching quotation items to the assignment item
    return {
      ...assignmentItem,
      quotationItems: matchingQuotationItems, // Add an array of matching quotation items
    };
  });

  return mergedItems;
}

const ViewVendorsPage = () => {
  const params = useParams<{
    id: string;
  }>();

  const { data: vendorAssignments, refetch } = useQuery({
    queryKey: [
      purchaseRequestQueries.purchaseRequest.getVendorsAssignments.key,
    ],
    queryFn: () => getVendorsAssignments(params.id),
  });

  const { mutate: requestQuotationMutation, isPending: requestingQuotation } =
    useMutation({
      mutationFn: requestQuotation,
      onSuccess: () => {
        toast.success("Quotation requested successfully!");
        refetch();
      },
      onError: () => {
        toast.error("Failed to request quotation!");
      },
    });
  const { mutate: acceptQuotationMutation, isPending: isAccepting } =
    useMutation({
      mutationFn: acceptQuotation,
      onSuccess: () => {
        toast.success("Quotation accepted successfully!");
        refetch();
      },
      onError: () => {
        toast.error("Failed to accepted quotation!");
      },
    });
  const { mutate: rejectQuotationMutation, isPending: isRejecting } =
    useMutation({
      mutationFn: rejectQuotation,
      onSuccess: () => {
        toast.success("Quotation rejected successfully!");
        refetch();
      },
      onError: () => {
        toast.error("Failed to reject quotation!");
      },
    });

  return (
    <>
      <Header title="View Assigned Vendors" description="" />

      {(vendorAssignments || [])?.map((vendorAssignment) => {
        const latestQuotationRecieved =
          vendorAssignment.quotations.find(
            (quotation) => quotation.status === "PENDING"
          ) || null;

        const mergedItems = mergeItemsWithQuotations(vendorAssignment);
        console.log(vendorAssignment);
        console.log(mergedItems);

        return (
          <Container className="grid gap-4 " key={vendorAssignment.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="font-bold text-lg">
                  {vendorAssignment?.vendor?.name}
                </p>
                <Badge variant={"tertiary"}>
                  {vendorAssignment.status.replaceAll("_", " ")}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                {vendorAssignment.status === "PENDING" && (
                  <Button
                    isLoading={requestingQuotation}
                    variant={"tertiary"}
                    onClick={() => {
                      requestQuotationMutation({
                        pr_vendor_assignment_ids: [vendorAssignment?.id],
                        purchase_request_id: Number(params?.id),
                      });
                    }}
                  >
                    {/* 
                TODO: request quotation-> wait -> quotation recieved ->table columns unit price, total price -> accept/reject quotation -> if accept  generete po and send to vendor
                */}
                    Request Quotation
                  </Button>
                )}
                {vendorAssignment.status === "RFQ" ||
                  (vendorAssignment.status === "QUOTATION_REJECTED" && (
                    <Button variant={"tertiary"} asChild>
                      <Link
                        href={`/purchase-request/${params.id}/upload-quotation/${vendorAssignment.id}`}
                      >
                        Upload Quotation
                      </Link>
                    </Button>
                  ))}
                {vendorAssignment.status === "QUOTATION_RECIEVED" && (
                  <>
                    <Button
                      disabled={!latestQuotationRecieved}
                      isLoading={isRejecting}
                      variant={"secondary"}
                      onClick={() => {
                        rejectQuotationMutation(
                          latestQuotationRecieved?.id as number
                        );
                      }}
                    >
                      Reject
                    </Button>
                    <Button
                      disabled={!latestQuotationRecieved}
                      isLoading={isAccepting}
                      variant={"tertiary"}
                      onClick={() => {
                        acceptQuotationMutation(
                          latestQuotationRecieved?.id as number
                        );
                      }}
                    >
                      Accept
                    </Button>
                  </>
                )}
              </div>
            </div>
            <DataTable
              data={vendorAssignment?.items || []}
              columns={viewVendorColumns}
            />
          </Container>
        );
      })}
    </>
  );
};

export default ViewVendorsPage;
