import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type Props = {
  className: string;
  children?: ReactNode;
};

const Container = ({ children, className }: Props) => {
  return (
    <div className={cn("p-4 bg-white rounded-md shadow-md", className)}>
      {children}
    </div>
  );
};

export default Container;
