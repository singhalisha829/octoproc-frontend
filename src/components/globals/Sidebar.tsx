import { LayoutDashboard, LogOut, NotebookText } from "lucide-react";
import Link from "next/link";

const links = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    name: "Ledger",
    url: "/ledger",
    icon: <NotebookText />,
  },
];

const Sidebar = () => {
  return (
    <aside className="max-w-xs h-screen shadow-md p-4 flex flex-col gap-4">
      <h1 className="text-4xl font-bold uppercase ">octoproc</h1>
      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.url}
            className="text-sm flex items-center gap-2 p-2 hover:underline hover:font-medium transition-all hover:bg-gray-200/40"
            href={link.url}
          >
            {link.icon} {link.name}
          </Link>
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
