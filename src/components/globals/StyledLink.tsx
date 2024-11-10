"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  url: string;
  name: string;
  icon: any;
};

const StyledLink = ({ url, name, icon }: Props) => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <Link
      className={cn(
        "text-sm flex items-center gap-2 p-2 hover:underline hover:font-medium transition-all hover:bg-gray-200/40",
        pathname === url && "border-l-4 border-red-500 bg-gradient-to-tr from-red-500/10 to-red-100/10"
      )}
      href={url}
    >
      {icon} {name}
    </Link>
  );
};

export default StyledLink;
