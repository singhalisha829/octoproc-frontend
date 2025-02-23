"use client";
import { DataTableColumnCell } from "@/components/table/DataTableColumnCell";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { PurchaseOrder } from "@/interfaces/PurchaseOrder";
import { formatEnumString } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { type VariantProps } from "class-variance-authority"
import { badgeVariants } from "@/components/ui/badge";

export const purchaseOrderColumns: ColumnDef<PurchaseOrder>[] = [
  {
    accessorKey: "reference_no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Refernce No." />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        badge={
          <Badge variant={"tertiary"}>{`#${row.original.reference_no}`}</Badge>
        }
      />
    ),
  },

  {
    accessorKey: "vendor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vendor" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        title={row.original?.vendor_name}
      />
    ),
  },
  {
    accessorKey: "tax_amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tax Amount" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        title={String(row.original?.tax_amount?.toFixed(2))}
      />
    ),
  },
  {
    accessorKey: "shipping_cost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shipping Cost" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        title={String(row.original?.shipping_cost?.toFixed(2))}
      />
    ),
  },
  {
    accessorKey: "total_amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        title={String(row.original?.total_amount?.toFixed(2))}
      />
    ),
  },
  {
    accessorKey: "expected_delivery_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delivery Date" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        title={formatDate(new Date(row.original.expected_delivery_date), "yyyy-MM-dd")}
      />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      const statusVariantMap: Record<string, VariantProps<typeof badgeVariants>["variant"]> = {
        goods_received: "purchase_order_sent",
      };
      
      return <DataTableColumnCell row={row} badge={<Badge variant={statusVariantMap[status.toLowerCase()] || "default"}>{`${formatEnumString(status)}`}</Badge>} />;
    },
  },

];
