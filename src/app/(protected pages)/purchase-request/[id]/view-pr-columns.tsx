"use client";
import AssignVendor from "@/components/purchaseRequestPage/AssignVendor";
import { DataTableColumnCell } from "@/components/table/DataTableColumnCell";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Item } from "@/interfaces/Stock";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";

export const viewPrColumns: ColumnDef<Item>[] = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) =>
      (row.original.assignments?.length || 0) > 0 && (
        <button
          onClick={row.getToggleExpandedHandler()}
          className="text-primary"
        >
          {row.getIsExpanded() ? <ChevronDown /> : <ChevronRight />}
        </button>
      ),
  },

  {
    accessorKey: "productId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product ID" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        badge={
          <Badge variant={"tertiary"}>{`#${row.original.productId}`}</Badge>
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
      <DataTableColumnCell row={row} title={row.original.productName} />
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
    accessorKey: "assignedquantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title=" AssignedQuantity" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        title={`${row.original.assigned_quantity}/${String(
          row.original.quantity
        )}`}
      />
    ),
  },
];
