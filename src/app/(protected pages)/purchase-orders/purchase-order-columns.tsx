"use client";
import { DataTableColumnCell } from "@/components/table/DataTableColumnCell";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { PurchaseOrder } from "@/interfaces/PurchaseOrder";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";

export const purchaseOrderColumns: ColumnDef<PurchaseOrder>[] = [
  {
    accessorKey: "reference_no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Refernce No." />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        badge={
          <Badge variant={"tertiary"}>{`#${row.original.reference_no}`}</Badge>
        }
      />
    ),
  },

  {
    accessorKey: "vendor_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vendor ID" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        title={row.original.vendor_id?.toString()}
      />
    ),
  },
  {
    accessorKey: "total_amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        title={String(row.original?.total_amount?.toFixed(2))}
      />
    ),
  },
  {
    accessorKey: "expected_delivery_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delivery Date" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        title={formatDate(new Date(row.original.expected_delivery_date), "yyyy-MM-dd")}
      />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={row.original.status} />
    ),
  },
];
