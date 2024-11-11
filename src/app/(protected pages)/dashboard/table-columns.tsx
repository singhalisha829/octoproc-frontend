"use client";
import { DataTableColumnCell } from "@/components/table/DataTableColumnCell";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
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
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        badge={
          <Badge variant={"tertiary"}>{`#${row.original.id as string}`}</Badge>
        }
      />
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PART TYPE" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={`${row.original.type as string}`} />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NAME & DESCRIPTION" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        title={`${row.original.name as string} & ${row.original.description}`}
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
];
