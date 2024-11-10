"use client";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
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
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DATE" />
    ),
  },
  {
    accessorKey: "partId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PART ID" />
    ),
  },

  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="QUANTITY" />
    ),
  },
  {
    accessorKey: "balanceQuantiy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="BALANCE QUANTITY" />
    ),
  },
  {
    accessorKey: "documentId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DOCUMENT ID" />
    ),
  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CREATED BY" />
    ),
  },
];
