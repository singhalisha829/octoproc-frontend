"use client";
import Container from "@/components/globals/Container";
import Header from "@/components/globals/Header";

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPurchaseOrder } from "@/api/purchaseRequest/purchaseOrder";
import { purchaseOrderQueries } from "@/react-query/purchaseOrderQueries";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { formatEnumString } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority"
import { badgeVariants } from "@/components/ui/badge";
import { viewPoItemsColumns } from "./po-item-columns";
import { DataTable } from "@/components/table/data-table";

const ViewItems = () => {
  const params = useParams<{
    id: string;
  }>();
  const router = useRouter();
  const purchaseOrderId = params.id;

  const { data: purchaseOrder } = useQuery({
    queryKey: [purchaseOrderQueries.getPurchaseOrders.key, purchaseOrderId],
    queryFn: () => getPurchaseOrder(Number(purchaseOrderId)), 
    enabled: !!purchaseOrderId,
  });

  const poInfo = useMemo(
      () => ({
        vendor: purchaseOrder?.vendor_name,
        status: purchaseOrder?.status,
        delivery_date: purchaseOrder?.expected_delivery_date,
        billing_address: purchaseOrder?.billing_address,
        net_amount: purchaseOrder?.net_amount,
        tax_amount: purchaseOrder?.tax_amount,
        total_amount: purchaseOrder?.total_amount,
        shipping_cost: purchaseOrder?.shipping_cost,
        shipping_address: purchaseOrder?.shipping_address,
        payment_terms: purchaseOrder?.payment_terms,
        notes: purchaseOrder?.notes
      }),
      [purchaseOrder]
    );

  const statusVariantMap: Record<string, VariantProps<typeof badgeVariants>["variant"]> = {
    goods_received: "purchase_order_sent",
  };

  // items table -> show the relevent columns based on the backend schema (may change)

  return (
    <>
      <Header title={purchaseOrder?.reference_no ?? ''} description="" />
      <Container className="grid grid-cols-3 gap-5">
      {Object.entries(poInfo).map(([key, value]) => (
          <div className="flex items-center gap-1.5" key={key}>
            <p className="text-sm font-semibold capitalize">
              {key.replaceAll("_", " ")}:
            </p>
            <p className="text-sm font-extrabold text-primary">
              {key === "status" ? (
                <Badge variant={statusVariantMap[String(value ?? "").toLowerCase()] || "default"}>
                  {formatEnumString(String(value ?? ""))}
                </Badge>
              ) : (
                value ?? "NA"
              )}
            </p>
          </div>
        ))}
      </Container>
      <Container className="grid gap-2">
        <p className="text-xl font-semibold">Items:</p>
        <div className="overflow-x-auto">
        <DataTable data={purchaseOrder?.items || []} columns={viewPoItemsColumns} />
        </div>
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

export default ViewItems;
