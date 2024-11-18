"use client";
import AssignVendor from "@/components/purchaseRequestPage/AssignVendor";
import { DataTableColumnCell } from "@/components/table/DataTableColumnCell";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Item } from "@/interfaces/Stock";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const viewPrColumns: ColumnDef<Item>[] = [
  {
    accessorKey: "partId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Part ID" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        badge={
          <Badge variant={"tertiary"}>{`#${
            row.original.partId as string
          }`}</Badge>
        }
      />
    ),
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Part Name" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={row.original.partName} />
    ),
  },

  {
    accessorKey: "unitPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit Price" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={String(row.original.unitPrice)} />
    ),
  },

  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={String(row.original.quantity)} />
    ),
  },
  {
    id: "actions",
    enableHiding: false,

    cell: ({row}) => {
      return (
        <div className="flex items-center justify-end">
          <Button asChild variant={"link"}>
            <Link href={`/purchase-request/${row.original.partId}/view-vendors`}>
            View Vendors
            </Link>
            </Button>
        </div>
      );
    },
  },
];
