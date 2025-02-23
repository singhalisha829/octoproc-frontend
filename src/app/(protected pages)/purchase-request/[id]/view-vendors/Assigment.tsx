import {
  acceptQuotation,
  rejectQuotation,
  requestQuotation,
} from "@/api/purchaseRequest";
import Container from "@/components/globals/Container";
import GeneratePoModal from "@/components/purchaseRequestPage/GeneratePoModal";
import { DataTable } from "@/components/table/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VendorAssignment } from "@/interfaces/PurchaseRequest";
import { mergeVendorAssignmentWithQuotations } from "@/lib/utils";
import { purchaseRequestQueries } from "@/react-query/purchaseRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { quotationRecievedColumns } from "./quotationRecievedColumns";
import { viewVendorColumns } from "./view-vendor-columns";
import ViewVendorQoutationHistory from "@/components/purchaseRequestPage/ViewVendorQoutation";

type Props = {
  vendorAssignment: VendorAssignment;
};

const Assigment = ({ vendorAssignment }: Props) => {
  const params = useParams<{
    id: string;
  }>();
  const queryClient = useQueryClient();

  const refetch = () => {
    queryClient.invalidateQueries({
      queryKey: [
        purchaseRequestQueries.purchaseRequest.getVendorsAssignments.key,
      ],
    });
  };

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

  const latestQuotationRecieved =
    vendorAssignment.quotations.find(
      (quotation) => quotation.status === "PENDING"
    ) || null;
  const approvedQuotation =
    vendorAssignment.quotations.find(
      (quotation) => quotation.status === "APPROVED"
    ) || null;

  const mergedItems = mergeVendorAssignmentWithQuotations(vendorAssignment);
  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between" key={vendorAssignment.id}>
        <div className="flex items-center gap-2">
          <p className="font-bold text-lg">{vendorAssignment?.vendor?.name}</p>
          <Badge variant={"tertiary"}>
            {vendorAssignment.status.replaceAll("_", " ")}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          {vendorAssignment.status === "PENDING" && (
            <Button
              isLoading={requestingQuotation}
              variant={"tertiary"}
              className="mb-2"
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
          {(vendorAssignment.status === "RFQ" ||
            vendorAssignment.status === "QUOTATION_REJECTED") && (
            <Button variant={"tertiary"} asChild className="mb-2">
              <Link
                href={`/purchase-request/${params.id}/upload-quotation/${vendorAssignment.id}`}
              >
                Upload Quotation
              </Link>
            </Button>
          )}
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
          {vendorAssignment.status === "QUOTATION_APPROVED" && (
            <GeneratePoModal
              onSuccess={() => {
                refetch();
              }}
              vendorQuotationId={approvedQuotation?.id as number}
              enterpriseId={vendorAssignment.enterprise_client_id}
              items={approvedQuotation?.items}
            />
          )}

          {vendorAssignment.quotations.length > 0 && <ViewVendorQoutationHistory quotations={vendorAssignment.quotations ?? []}/> }
        </div>
      </div>
      <DataTable
        data={vendorAssignment?.items || []}
        columns={viewVendorColumns}
      />
      
    </div>
  );
};

export default Assigment;
