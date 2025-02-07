"use client";
import { DataTableColumnCell } from "@/components/table/DataTableColumnCell";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import {
  VendorAssigmentItem
} from "@/interfaces/PurchaseRequest";
import { ColumnDef } from "@tanstack/react-table";

export const viewVendorColumns: ColumnDef<VendorAssigmentItem>[] = [
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
          >{`#${row.original.purchase_request_item.product.id}`}</Badge>
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
        title={row.original.purchase_request_item.product.name}
      />
    ),
  },

  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={`${row.original.quantity} ${row.original.purchase_request_item.product?.uom?.symbol}`} />
    ),
  },
  {
    accessorKey: "unitPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit Price" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={`${row.original.unit_price ?? '...'}`} />
    ),
  },
  {
    accessorKey: "totalValue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Value" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={`${row.original.total_value ?? '...'}`} />
    ),
  },
  {
    accessorKey: "taxRate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tax Rate" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={`${row.original.tax_rate ?? '...'}`} />
    ),
  },
  {
    accessorKey: "taxAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tax Amount" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={`${row.original.tax_amount ?? '...'}`} />
    ),
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Amount" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell row={row} title={`${row.original.total_amount ?? '...'}`} />
    ),
  },
];
