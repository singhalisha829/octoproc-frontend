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
import { Eye, Pen } from "lucide-react";
import Link from "next/link";

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
      const totalItems = row.original.items.length;
      let itemsAssigned = 0;
      row.original.vendors.forEach(
        (vendor) => (itemsAssigned += vendor.quantity)
      );
      console.log(itemsAssigned);

      return (
        <div className=" flex items-center justify-end gap-3">
          {itemsAssigned !== totalItems && (
            <AssignVendor vendors={row.original.vendors} />
          )}
          {itemsAssigned === totalItems && (
            <Button variant="link" className="text-zinc-950 font-semibold" asChild>
              <Link href={`/purchase-request/view-vendors`}>
                View Vendors <Eye />
              </Link>
            </Button>
          )}
          <Button variant="link" className="text-zinc-950 font-semibold">
            Edit <Pen />
          </Button>
        </div>
      );
    },
  },
];
