"use client";
import { DataTableColumnCell } from "@/components/table/DataTableColumnCell";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { InventoryApiResponse, InventoryItem } from "@/interfaces/Inventory";
import { ColumnDef } from "@tanstack/react-table";

export const inventoryColumns: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PART ID" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        badge={<Badge variant={"tertiary"}>{`#${row.original.id}`}</Badge>}
      />
    ),
  },
  // {
  //   accessorKey: "type",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Product TYPE" />
  //   ),
  //   cell: ({ row }) => (
  //     <DataTableColumnCell row={row} title={`${row.original.product.}`} />
  //   ),
  // },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NAME" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={row.original.product.name} />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DESCRIPTION" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={row.original.product.description} />
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="QUANTITY" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={`${row.original.quantity} ${row.original.product?.uom?.symbol ?? ''}`} />
    ),
  },
];
