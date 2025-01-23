"use client";
import {
  getVendorsAssignments
} from "@/api/purchaseRequest";
import Header from "@/components/globals/Header";
import { purchaseRequestQueries } from "@/react-query/purchaseRequest";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Assigment from "./Assigment";

const ViewVendorsPage = () => {
  const params = useParams<{
    id: string;
  }>();

  const { data: vendorAssignments } = useQuery({
    queryKey: [
      purchaseRequestQueries.purchaseRequest.getVendorsAssignments.key,
      params.id,
    ],
    queryFn: () => getVendorsAssignments(params.id),
    enabled: !!params.id,
  });

  return (
    <>
      <Header title="View Assigned Vendors" description="" />

      {(vendorAssignments || [])?.map((vendorAssignment) => {
        return (
          <Assigment
            key={vendorAssignment.id}
            vendorAssignment={vendorAssignment}
          />
        );
      })}
    </>
  );
};

export default ViewVendorsPage;
