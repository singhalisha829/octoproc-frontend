import { DataTableColumnCell } from "@/components/table/DataTableColumnCell";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Client } from "@/interfaces/Client";
import { ColumnDef } from "@tanstack/react-table";
import { Pen } from "lucide-react";
import Link from "next/link";

export const clientsListColumns: ColumnDef<Client>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client ID" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        badge={<Badge variant={"tertiary"}>{`#${row.original.id}`}</Badge>}
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={row.original.name || ""} />
    ),
  },
  {
    accessorKey: "pan_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pan No." />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        title={`${row.original.pan_number || ""}`}
      />
    ),
  },
  {
    accessorKey: "gst_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GST In" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={row.getValue("gst_number")} />
    ),
  },

  // {
  //   accessorKey: "contact_persons",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Contact Person Name" />
  //   ),
  //   cell: ({ row }) => (
  //     <DataTableColumnCell
  //       row={row}
  //       title={`${row.original.contact_persons[0]?.first_name || ""} ${
  //         row.original.contact_persons[0]?.last_name || ""
  //       }`}
  //     />
  //   ),
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
            onClick={(e) => e.stopPropagation()}
            asChild
            variant="link"
            className="text-zinc-950 font-semibold"
          >
            <Link href={`/client/action/edit?id=${row.original.id}`}>
              Edit <Pen />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
