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
import { Quotation } from "@/interfaces/PurchaseRequest";
import { DataTableColumnCell } from "@/components/table/DataTableColumnCell";
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Eye } from 'lucide-react';

const quotationColumns: ColumnDef<Quotation>[] = [
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
        return <DataTableColumnCell row={row} title={row.original.status || ""} />;
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

type Props = {
    quotations: Quotation[];
};

const ViewVendorQoutationHistory = ({quotations}: Props) =>{
      const [isOpen, setIsOpen] = useState(false);
    
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
      <DataTable
              data={quotations || []}
              columns={quotationColumns}
            />
      </DialogContent>
      </Dialog>)
}

export default ViewVendorQoutationHistory;