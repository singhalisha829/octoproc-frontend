"use client";
import AssignVendor, {
  Vendor,
} from "@/components/purchaseRequestPage/AssignVendor";
import { DataTableColumnCell } from "@/components/table/DataTableColumnCell";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Item } from "@/interfaces/Stock";
import { ColumnDef } from "@tanstack/react-table";
import { Pen } from "lucide-react";

export type PurchaseRequest = {
  id: string | number;
  name: string;
  items: Item[];
  vendors: Vendor[];
};

export const purchaseRequestColumns: ColumnDef<PurchaseRequest>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NAME" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        onRowClick={(router) => {
          router.push(`/purchase-request/${row.original.id}`);
        }}
        row={row}
        title={row.original.name}
      />
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className=" flex items-center justify-end gap-3">
          <AssignVendor vendors={row.original.vendors} />
          <Button variant="link" className="text-zinc-950 font-semibold">
            Edit <Pen />
          </Button>
        </div>
      );
    },
  },
];
