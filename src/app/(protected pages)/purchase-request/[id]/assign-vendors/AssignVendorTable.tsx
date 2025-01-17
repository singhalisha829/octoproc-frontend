import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Item } from "@/interfaces/Stock";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import * as React from "react";

interface AssignVendorTableProps {
  columns: ColumnDef<Item>[];
  data: Item[];
}
export default function AssignVendorTable({
  data,
  columns,
}: AssignVendorTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: (row) => (row?.original?.assignments?.length || 0) > 0,
  });

  return (
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
                <TableCell colSpan={columns.length}>
                  <div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3">
                    {(row.original.assignments?.length || 0) > 0 ? (
                      row.original.assignments?.map((assignment) => (
                        <div
                          key={assignment.id}
                          className="border rounded-md px-3 py-2 flex items-center justify-between"
                        >
                          <div className="flex flex-col gap-1.5">
                            <h4 className="font-bold">
                              {assignment.vendor.name}
                            </h4>
                            {/* <p>Contact: {vendor.name}</p> */}
                            <p>Quantity Assigned: {assignment.quantity}</p>
                          </div>
                          <Button size={"icon"} variant={"outline"}>
                            <EllipsisVertical />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p>No vendors assigned.</p>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
}
