"use client";
import AssignVendor from "@/components/purchaseRequestPage/AssignVendor";
import { DataTableColumnCell } from "@/components/table/DataTableColumnCell";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import { Item } from "@/interfaces/Stock";
import { ColumnDef } from "@tanstack/react-table";
import { Pen } from "lucide-react";

export type PurchaseRequest = {
  id: string | number;
  name: string;
  items: Item[];
};

export const purchaseRequestColumns: ColumnDef<PurchaseRequest>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={String(row.original.id)} />
    ),
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NAME" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={row.original.name} />
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <div className=" flex items-center justify-end gap-3">
          <AssignVendor vendors={[]} />
          <Button variant="link" className="text-zinc-950 font-semibold">
            Edit <Pen />
          </Button>
        </div>
      );
    },
  },
];
