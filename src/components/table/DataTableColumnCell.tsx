import { Row } from "@tanstack/react-table";
import React from "react";

interface DataTableColumnCellProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  row: Row<TData>;
  title?: string;
  badge?: JSX.Element;
}

export function DataTableColumnCell<TData>({
  title,
  badge,
}: DataTableColumnCellProps<TData>) {
  return (
    <div className="text-center flex items-center justify-center">
      {badge ? badge : title}
    </div>
  );
}
