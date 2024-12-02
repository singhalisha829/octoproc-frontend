"use client";
import AssignVendor from "@/components/purchaseRequestPage/AssignVendor";
import { DataTableColumnCell } from "@/components/table/DataTableColumnCell";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Item } from "@/interfaces/Stock";
import { ColumnDef } from "@tanstack/react-table";

export const viewVendorColumns: ColumnDef<Item>[] = [
  {
    accessorKey: "productId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product ID" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        badge={
          <Badge variant={"tertiary"}>{`#${
            row.original.productId
          }`}</Badge>
        }
      />
    ),
  },

  {
    accessorKey: "productName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={row.original.productName} />
    ),
  },

  // {
  //   accessorKey: "unitPrice",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Unit Price" />
  //   ),
  //   cell: ({ row }) => (
  //     <DataTableColumnCell row={row} title={String(row.original.unitPrice)} />
  //   ),
  // },

  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={String(row.original.quantity)} />
    ),
  },
];
