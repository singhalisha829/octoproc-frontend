import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "../table/data-table";
import { Quotation, QuotationItem } from "@/interfaces/PurchaseRequest";
import { DataTableColumnCell } from "@/components/table/DataTableColumnCell";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Eye } from 'lucide-react';
import { ChevronDown, ChevronRight } from "lucide-react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    useReactTable,
  } from "@tanstack/react-table";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import * as React from "react";
import { type VariantProps } from "class-variance-authority"
import { badgeVariants } from "@/components/ui/badge";
import { formatEnumString } from "@/lib/utils";

const quotationColumns: ColumnDef<Quotation>[] = [
    {
        id: "expander",
        header: () => null,
        cell: ({ row }) =>
          (row.original.items?.length || 0) > 0 && (
            <button
              onClick={row.getToggleExpandedHandler()}
              className="text-primary"
            >
              {row.getIsExpanded() ? <ChevronDown /> : <ChevronRight />}
            </button>
          ),
      },
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
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
          const status = row.original.status;
          const statusVariantMap: Record<string, VariantProps<typeof badgeVariants>["variant"]> = {
            rejected: "destructive",
            approved: "approved",
          };
          
          return <DataTableColumnCell row={row} badge={<Badge variant={statusVariantMap[status.toLowerCase()] || "default"}>{`${formatEnumString(status)}`}</Badge>} />;
        },
      },
    {
        accessorKey: "file",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Document" />
        ),
        cell: ({ row }) => {
          const fileUrl = row.original.file_url;
    
          return (
            <div className="flex items-center justify-center">
              {fileUrl && fileUrl != '' ? (
                <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                  <Eye className="w-5 h-5 text-primary cursor-pointer hover:text-primary-foreground" />
                </a>
              ) : (
                <span className="text-gray-400">No File</span>
              )}
            </div>
          );
        },
      },
    {
      accessorKey: "netAmount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Net Amount" />
      ),
      cell: ({ row }) => (
        <DataTableColumnCell
          row={row}
          title={`${row.original.net_amount}`}
        />
      ),
    },
  
    {
        accessorKey: "taxRate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tax Rate" />
      ),
      cell: ({ row }) => (
        <DataTableColumnCell
          row={row}
          title={`${row.original.net_amount}`}
        />
      ),
    },
    {
        accessorKey: "taxAmount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tax Amount" />
          ),
        cell: ({ row }) => (
          <DataTableColumnCell
            row={row}
            title={`${row.original.tax_amount}`}
          />
        ),
      },
      {
        accessorKey: "totalAmount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Total Amount" />
          ),
        cell: ({ row }) => (
          <DataTableColumnCell
            row={row}
            title={`${row.original.total_amount}`}
          />
        ),
      },
];

const quotationItemsColumns: ColumnDef<QuotationItem>[] = [
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
      accessorKey: "productName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Product Name" />
      ),
      cell: ({ row }) => {
        return <DataTableColumnCell row={row} title={"-"} />;
      },
    },
    {
      accessorKey: "netAmount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Net Amount" />
      ),
      cell: ({ row }) => (
        <DataTableColumnCell
          row={row}
          title={`${row.original.net_amount}`}
        />
      ),
    },
  
    {
        accessorKey: "taxRate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tax Rate" />
      ),
      cell: ({ row }) => (
        <DataTableColumnCell
          row={row}
          title={`${row.original.net_amount}`}
        />
      ),
    },
    {
        accessorKey: "taxAmount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tax Amount" />
          ),
        cell: ({ row }) => (
          <DataTableColumnCell
            row={row}
            title={`${row.original.tax_amount}`}
          />
        ),
      },
      {
        accessorKey: "totalAmount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Total Amount" />
          ),
        cell: ({ row }) => (
          <DataTableColumnCell
            row={row}
            title={`${row.original.total_amount}`}
          />
        ),
      },
];

type Props = {
    quotations: Quotation[];
};

const ViewVendorQoutationHistory = ({quotations}: Props) =>{
      const [isOpen, setIsOpen] = useState(false);
       const table = useReactTable({
        data:quotations,
        columns:quotationColumns,
          getCoreRowModel: getCoreRowModel(),
          getExpandedRowModel: getExpandedRowModel(),
          getRowCanExpand: (row) => (row?.original?.items?.length || 0) > 0,
        });
    
    return(<Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
    <DialogTrigger asChild>
      <Button variant="link" className="text-l leading-8 font-bold text-primary underline">
      Prev. Qoutations
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>Previous Quotations</DialogTitle>
      </DialogHeader>
      <Table className="table-auto w-full border-collapse">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && (
                    <TableRow>
                      <TableCell colSpan={quotationColumns.length}>
                        <DataTable data={row.original.items} columns={quotationItemsColumns}/>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
      </DialogContent>
      </Dialog>)
}

export default ViewVendorQoutationHistory;