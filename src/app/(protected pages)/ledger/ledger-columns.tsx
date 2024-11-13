"use client";
import { DataTableColumnCell } from "@/components/table/DataTableColumnCell";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

export type Transaction = {
  id: string | number;
  type: string;
  partId: string | number;
  date: string;
  quantity: number;
  balanceQuantiy: number;
  documentId: number;
  createdBy: string;
};

export const ledgerColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TRANSACTION TYPE" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        badge={
          <Badge variant={"secondary"}>{`${row.original.type as string}`}</Badge>
        }
      />
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DATE" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={row.original.date} />
    ),
  },
  {
    accessorKey: "partId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PART ID" />
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
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="QUANTITY" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={String(row.original.quantity)} />
    ),
  },
  {
    accessorKey: "balanceQuantiy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="BALANCE QUANTITY" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        title={String(row.original.balanceQuantiy)}
      />
    ),
  },
  {
    accessorKey: "documentId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DOCUMENT ID" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={String(row.original.documentId)} />
    ),
  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CREATED BY" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={String(row.original.createdBy)} />
    ),
  },
];
