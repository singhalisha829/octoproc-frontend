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
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vendor Name" />
    ),
    cell: ({ row }) => <DataTableColumnCell row={row} title={`${""}`} />,
  },
  {
    accessorKey: "mobile",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mobile" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={`${row.original.name as string}`} />
    ),
  },
  {
    accessorKey: "gstin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GST IN" />
    ),
    cell: ({ row }) => <DataTableColumnCell row={row} title={""} />,
  },
];
