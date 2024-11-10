"use client";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";

export type Stock = {
  id: string | number;
  type: string;
  name: string;
  description: string;
  quantity: number;
};

export const stocksColumns: ColumnDef<Stock>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PART ID" />
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PART TYPE" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NAME & DESCRIPTION" />
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="QUANTITY" />
    ),
  },
];
