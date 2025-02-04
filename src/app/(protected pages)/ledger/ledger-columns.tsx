"use client";
import { DataTableColumnCell } from "@/components/table/DataTableColumnCell";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { InventoryRecord } from "@/interfaces/Legder";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";

export const ledgerColumns: ColumnDef<InventoryRecord>[] = [
  {
    accessorKey: "transaction_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TRANSACTION TYPE" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        badge={
          <Badge variant={"tertiary"}>{`${
            row.original.entry.transaction_type as string
          }`}</Badge>
        }
      />
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DATE" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        title={formatDate(
          new Date(row.original.entry.created_at),
          "yyyy-MM-dd"
        )}
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        title={String(row.original?.product?.name)}
      />
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="QUANTITY" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        title={`${row.original.entry.quantity} ${row.original.uom.symbol}`}
      />
    ),
  },
  {
    accessorKey: "starting_balance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="STARTING BALANCE" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        title={String(row.original.entry.starting_balance)}
      />
    ),
  },
  {
    accessorKey: "closing_balance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CLOSING BALANCE" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        title={String(row.original.entry.closing_balance)}
      />
    ),
  },

  // {
  //   accessorKey: "transaction_id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="DOCUMENT ID" />
  //   ),
  //   cell: ({ row }) => (
  //     <DataTableColumnCell row={row} title={String(row.original.entry.transaction_id)} />
  //   ),
  // },
  // {
  //   accessorKey: "createdBy",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="CREATED BY" />
  //   ),
  //   cell: ({ row }) => (
  //     <DataTableColumnCell row={row} title={String(row.original.entry.)} />
  //   ),
  // },
];
