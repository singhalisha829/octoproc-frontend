"use client";
import {
  getPurchaseRequest,
  getVendorsAssignments,
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

const ViewVendorsPage = () => {
  const params = useParams<{
    id: string;
  }>();

  const { data: vendorAssignments } = useQuery({
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
      },
      onError: () => {
        toast.error("Failed to request quotation!");
      },
    });

  return (
    <>
      <Header title="View Assigned Vendors" description="" />

      {(vendorAssignments || [])?.map((vendorAssignment) => (
        <Container className="grid gap-4 " key={vendorAssignment.id}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="font-bold text-lg">
                {vendorAssignment?.vendor?.name}
              </p>
              <Badge variant={"tertiary"}>{vendorAssignment.status}</Badge>
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
              {vendorAssignment.status === "RFQ" && (
                <Button variant={"tertiary"} asChild>
                  <Link
                    href={`/purchase-request/${params.id}/upload-quotation/${vendorAssignment.id}`}
                  >
                    Upload Quotation
                  </Link>
                </Button>
              )}
              {vendorAssignment.status === "QUOTATION_RECIEVED" && (
                <>
                  <Button variant={"secondary"} onClick={() => {}}>
                    Reject
                  </Button>
                  <Button variant={"tertiary"} onClick={() => {}}>
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
      ))}
    </>
  );
};

export default ViewVendorsPage;
