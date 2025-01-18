"use client";
import { DataTableColumnCell } from "@/components/table/DataTableColumnCell";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PurchaseRequest } from "@/interfaces/PurchaseRequest";
import { ColumnDef } from "@tanstack/react-table";
import { Pen } from "lucide-react";
import Link from "next/link";

interface PurchaseOrder {
  poNo: number;
  date: string;
  vendor: string;
  amount: number;
  status: string;
}

export const purchaseOrderColumns: ColumnDef<PurchaseOrder>[] = [
  {
    accessorKey: "poNo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PO NO." />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        badge={<Badge variant={"tertiary"}>{`#${row.original.poNo}`}</Badge>}
      />
    ),
  },

  {
    accessorKey: "vendor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vendor" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={row.original.vendor} />
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={String(row.original.amount)} />
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={row.original.date} />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={row.original.status} />
    ),
  },

  //   {
  //     id: "actions",
  //     enableHiding: false,
  //     cell: ({ row }) => {
  //       // const items = row.original.items;
  //       // let totalItems = 0;
  //       // let itemsAssigned = 0;
  //       // items.forEach((item) => (totalItems += item.quantity));

  //       // row.original.vendors.forEach(
  //       //   (vendor) => (itemsAssigned += vendor.quantity)
  //       // );

  //       return (
  //         <div className=" flex items-center justify-end gap-3">
  //           {/* {itemsAssigned !== totalItems && (
  //             <AssignVendor vendors={row.original.vendors} />
  //           )}
  //           {itemsAssigned === totalItems && (
  //             <Button
  //               variant="link"
  //               className="text-zinc-950 font-semibold"
  //               asChild
  //             >
  //               <Link href={`/purchase-request/view-vendors`}>
  //                 View Vendors <Eye />
  //               </Link>
  //             </Button>
  //           )} */}
  //           <Button
  //             asChild
  //             variant="link"
  //             className="text-zinc-950 font-semibold"
  //           >
  //             <Link href={"/purchase-request/action/edit"}>
  //               Edit <Pen />
  //             </Link>
  //           </Button>
  //         </div>
  //       );
  //     },
  //   },
];
