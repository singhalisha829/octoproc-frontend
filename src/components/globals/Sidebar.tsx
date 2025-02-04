"use client";
import {
  BookOpenText,
  FileText,
  LayoutDashboard,
  LogOut,
  NotebookText,
  PackageOpen,
  ShoppingBag,
  ShoppingCart,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import StyledLink from "./StyledLink";
import SelectWithLabel from "@/components/ui/SelectWithLabel";
import { transformSelectOptions } from "@/lib/utils";
import { getClients } from "@/api/enterprise";
import { useQuery } from "@tanstack/react-query";
import { enterpriseQueries } from "@/react-query/enterpriseQueries";
import { LocalStorageService } from "@/services/LocalStorageService";
import { SELECTED_CLIENT } from "@/data/constants";
import { useClient } from "@/contexts/ClientContext";

const links = [
  // {
  //   name: "Dashboard",
  //   url: "/dashboard",
  //   icon: <LayoutDashboard />,
  // },
  {
    name: "Inventory",
    url: "/inventory",
    icon: <PackageOpen />,
  },
  {
    name: "Purchase Request",
    url: "/purchase-request",
    icon: <ShoppingCart />,
  },
  {
    name: "Purchase Order",
    url: "/purchase-orders",
    icon: <ShoppingBag />,
  },
  {
    name: "Ledger",
    url: "/ledger",
    icon: <BookOpenText />,
  },
];

// these pages are not filterable based on clients
const commonPageLinks = [ {
  name: "Vendor",
  url: "/vendors",
  icon: <NotebookText />,
},
{
  name: "Client",
  url: "/client",
  icon: <Users />,
},];

const Sidebar = () => {
  const { selectedClient, setSelectedClient } = useClient();
  const { data: clients } = useQuery({
    queryKey: [enterpriseQueries.client.getClients.key],
    queryFn: () => getClients(),
  });

  return (
    <aside className="max-w-xs h-screen shadow-md p-4 flex flex-col gap-4">
      <h1 className="text-4xl font-bold uppercase ">
        <Image
          alt="logo"
          layout="responsive"
          src={"/octoproc_logo.png"}
          width={200}
          height={100}
        />
      </h1>
      <SelectWithLabel
              value={selectedClient ?? ''}
              onSelect={(option) => {LocalStorageService.set(SELECTED_CLIENT,option ? Number(option.value) : null);setSelectedClient(option ? Number(option.value) : null)}}
              id={"client"}
              className="max-w-full"
              // labelText={"Client"}
              searchPlaceholder={`Search Client`}
              placeholder={"Select Client"}
              options={transformSelectOptions(clients, "id", "name") || []}
              emptyLabel={`No Client found`}
              valueKey="value"
              labelKey="label"
            />
      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <StyledLink {...link} key={link.url} />
        ))}
      </div>
        <hr/>
      <div className="flex flex-col gap-2">
        {commonPageLinks.map((link) => (
          <StyledLink {...link} key={link.url} />
        ))}
      </div>
      <Link
        className="mt-auto text-sm flex items-center gap-2 p-2 hover:underline hover:font-medium transition-all hover:bg-gray-200/40"
        href={"/login"}
      >
        <LogOut />
        Logout
      </Link>
    </aside>
  );
};

export default Sidebar;
