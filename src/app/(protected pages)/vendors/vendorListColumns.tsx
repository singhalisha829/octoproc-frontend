import { DataTableColumnCell } from "@/components/table/DataTableColumnCell";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Vendor } from "@/interfaces/Vendors";
import { ColumnDef } from "@tanstack/react-table";

export const vendorListColumns: ColumnDef<Vendor>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vendor ID" />
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
      <DataTableColumnHeader column={column} title="Vendor Name" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        title={row.original.name || ""}
        onRowClick={(router) => {
          router.push(`/vendors/${row.original.id}`);
        }}
      />
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mobile" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        title={`${(row.original.phone as string) || ""}`}
      />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={row.getValue("email")} />
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
  {
    accessorKey: "gstin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GST IN" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={row.getValue("gstin")} />
    ),
  },
];
