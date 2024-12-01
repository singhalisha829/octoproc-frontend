import { DataTableColumnCell } from "@/components/table/DataTableColumnCell";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Client } from "@/interfaces/Client";
import { ColumnDef } from "@tanstack/react-table";

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
  {
    accessorKey: "contact_persons",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact Person Name" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        title={`${row.original.contact_persons[0]?.first_name || ""} ${
          row.original.contact_persons[0]?.last_name || ""
        }`}
      />
    ),
  },
];
