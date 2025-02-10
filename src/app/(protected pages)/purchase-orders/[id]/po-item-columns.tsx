"use client";
import { DataTableColumnCell } from "@/components/table/DataTableColumnCell";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { PurchaseOrderItem } from "@/interfaces/PurchaseOrder";
import { ColumnDef } from "@tanstack/react-table";
import { type VariantProps } from "class-variance-authority"
import { badgeVariants } from "@/components/ui/badge";
import { formatEnumString } from "@/lib/utils";

export const viewPoItemsColumns: ColumnDef<PurchaseOrderItem>[] = [
  {
    accessorKey: "productId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product ID" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        badge={
          <Badge
            variant={"tertiary"}
          >{`#${row.original.product.id}`}</Badge>
        }
      />
    ),
  },

  {
    accessorKey: "productName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        title={row.original.product.name}
      />
    ),
  },

  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={`${row.original.quantity} ${row.original.product?.uom?.symbol}`} />
    ),
  },
  {
    accessorKey: "deliveredQuantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delivered Quantity" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={`${row.original.delivered_quantity}/${row.original.quantity} ${row.original.product?.uom?.symbol}`} />
    ),
  },
  {
    accessorKey: "unitPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit Price" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={`${row.original.unit_price}`} />
    ),
  },
  {
    accessorKey: "totalValue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Value" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={`${row.original.net_amount ?? '...'}`} />
    ),
  },
//   {
//     accessorKey: "taxRate",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Tax Rate(%)" />
//     ),
//     cell: ({ row }) => (
//       <DataTableColumnCell row={row} title={`${row.original.tax_rate ?? '...'}`} />
//     ),
//   },
  {
    accessorKey: "taxAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tax Amount" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={`${row.original.tax_amount}`} />
    ),
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Amount" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={`${row.original.total_amount}`} />
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
            pending: "waiting_for_approval",
          };
        return <DataTableColumnCell row={row} badge={<Badge variant={statusVariantMap[status.toLowerCase()] || "default"}>{`${formatEnumString(status)}`}</Badge>} />;
        },
  },
  {
    accessorKey: "notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Notes" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={`${row.original.notes}`} />
    ),
  },
];
