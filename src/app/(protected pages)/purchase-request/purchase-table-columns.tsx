"use client";
import { DataTableColumnCell } from "@/components/table/DataTableColumnCell";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PurchaseRequest } from "@/interfaces/PurchaseRequest";
import { ColumnDef } from "@tanstack/react-table";
import { Pen } from "lucide-react";
import Link from "next/link";

export const purchaseRequestColumns: ColumnDef<PurchaseRequest>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        badge={<Badge variant={"tertiary"}>{`#${row.original.id}`}</Badge>}
      />
    ),
  },

  {
    accessorKey: "enterprise_client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit Name" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        onRowClick={(router) => {
          router.push(`/purchase-request/${row.original.id}`);
        }}
        row={row}
        title={row.original.enterprise_client.name}
      />
    ),
  },
  // {
  //   accessorKey: "items",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="ITEMS ASSIGNED" />
  //   ),
  //   cell: ({ row }) => {
  //     const items = row.original.items;

  //     let totalItems = 0;
  //     items.forEach((item) => (totalItems += item.quantity));
  //     const vendors = row.original.vendors;
  //     let assignedItems = 0;
  //     vendors.forEach((vendor) => (assignedItems += vendor.quantity));

  //     return (
  //       <DataTableColumnCell
  //         row={row}
  //         title={`${assignedItems}/${totalItems}`}
  //       />
  //     );
  //   },
  // },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      // const items = row.original.items;
      // let totalItems = 0;
      // let itemsAssigned = 0;
      // items.forEach((item) => (totalItems += item.quantity));

      // row.original.vendors.forEach(
      //   (vendor) => (itemsAssigned += vendor.quantity)
      // );

      return (
        <div className=" flex items-center justify-end gap-3">
          {/* {itemsAssigned !== totalItems && (
            <AssignVendor vendors={row.original.vendors} />
          )}
          {itemsAssigned === totalItems && (
            <Button
              variant="link"
              className="text-zinc-950 font-semibold"
              asChild
            >
              <Link href={`/purchase-request/view-vendors`}>
                View Vendors <Eye />
              </Link>
            </Button>
          )} */}
          <Button
            asChild
            variant="link"
            className="text-zinc-950 font-semibold"
          >
            <Link href={"/purchase-request/action/edit"}>
              Edit <Pen />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
