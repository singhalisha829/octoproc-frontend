"use client";
import { DataTableColumnCell } from "@/components/table/DataTableColumnCell";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PurchaseRequest } from "@/interfaces/PurchaseRequest";
import { formatEnumString } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Pen } from "lucide-react";
import Link from "next/link";
import { type VariantProps } from "class-variance-authority"
import { badgeVariants } from "@/components/ui/badge";

export const purchaseRequestColumns: ColumnDef<PurchaseRequest>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        badge={<Badge variant={"tertiary"}>{`#${row.original.id}`}</Badge>}
      />
    ),
  },
  {
    accessorKey: "reference_no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reference No." />
    ),
    cell: ({ row }) => {
      const reference_no = row.original.reference_no;
      return <DataTableColumnCell row={row} title={reference_no || ""} />;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      const statusVariantMap: Record<string, VariantProps<typeof badgeVariants>["variant"]> = {
        created: "created",
        waiting_for_approval: "waiting_for_approval",
        approved: "approved",
        partially_vendor_assigned: "partially_vendor_assigned",
        vendor_assigned: "vendor_assigned",
        purchase_order_sent: "purchase_order_sent",
        waiting_for_quotation:"waiting_for_quotation"
      };
      
      return <DataTableColumnCell row={row} badge={<Badge variant={statusVariantMap[status.toLowerCase()] || "default"}>{`${formatEnumString(status)}`}</Badge>} />;
    },
  },
  {
    accessorKey: "enterprise_client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client Name" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        title={row.original.enterprise_client.name}
      />
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      // const items = row.original.items;
      // let totalItems = 0;
      // let itemsAssigned = 0;
      // items.forEach((item) => (totalItems += item.quantity));

      // row.original.vendors.forEach(
      //   (vendor) => (itemsAssigned += vendor.quantity)
      // );

      return (
        <div className=" flex items-center justify-end gap-3">
          {/* {itemsAssigned !== totalItems && (
            <AssignVendor vendors={row.original.vendors} />
          )}
          {itemsAssigned === totalItems && (
            <Button
              variant="link"
              className="text-zinc-950 font-semibold"
              asChild
            >
              <Link href={`/purchase-request/view-vendors`}>
                View Vendors <Eye />
              </Link>
            </Button>
          )} */}
          <Button
            onClick={(e) => e.stopPropagation()}
            asChild
            variant="link"
            className="text-zinc-950 font-semibold"
          >
            <Link href={`/purchase-request/action/edit?id=${row.original.id}`}>
              Edit <Pen />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
