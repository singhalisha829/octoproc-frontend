import { Row } from "@tanstack/react-table";
import React from "react";

type Props = {};

interface DataTableColumnCellProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  row: Row<TData>;
  title: string;
}

export function DataTableColumnCell<TData>({
  row,
  title,
}: DataTableColumnCellProps<TData>) {
  return (
    <div className="text-center flex items-center justify-center">{title}</div>
  );
}
