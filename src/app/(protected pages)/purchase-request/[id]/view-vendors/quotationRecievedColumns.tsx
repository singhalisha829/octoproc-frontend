"use client";
import { DataTableColumnCell } from "@/components/table/DataTableColumnCell";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Quotation, VendorAssigmentItem } from "@/interfaces/PurchaseRequest";
import { ColumnDef } from "@tanstack/react-table";

export const quotationRecievedColumns: ColumnDef<
  VendorAssigmentItem & {
    quotation?: Quotation;
  }
>[] = [
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
      <DataTableColumnCell
        row={row}
        title={String(row.original.quotation?.net_amount)}
      />
    ),
  },
  {
    accessorKey: "net_amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Net Amount" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        title={String(row.original.quotation?.net_amount)}
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
        title={String(row.original.quotation?.tax_amount)}
      />
    ),
  },
  {
    accessorKey: "total_amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Amount" />
    ),
    cell: ({ row }) => (
      <DataTableColumnCell
        row={row}
        title={String(row.original.quotation?.total_amount)}
      />
    ),
  },
];
