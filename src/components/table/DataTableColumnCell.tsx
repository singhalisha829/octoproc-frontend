import { Row } from "@tanstack/react-table";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React from "react";

interface DataTableColumnCellProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  row: Row<TData>;
  title?: string;
  badge?: JSX.Element;
  onRowClick?: (router: AppRouterInstance) => void;
}

export function DataTableColumnCell<TData>({
  title,
  badge,
  onRowClick = () => {},
}: DataTableColumnCellProps<TData>) {
  const router = useRouter();
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onRowClick(router);
      }}
      className="text-center flex items-center justify-center"
    >
      {badge ? badge : title}
    </div>
  );
}
