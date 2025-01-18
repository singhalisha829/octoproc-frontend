import Sidebar from "@/components/globals/Sidebar";
import { UserProvider } from "@/contexts/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <div
        style={{
          gridTemplateColumns: "320px 1fr",
          display: "grid",
          gap: "16px",
        }}
        className="w-full h-full"
      >
        <Sidebar />
        <div className="h-full overflow-y-auto relative">
          <div className="absolute inset-0 flex flex-col ">
            <img src="/bg_processed.png" className="h-[25%] z-[1]" />
            <div className="bg-[url('/background.png')] z-[1] bg-repeat bg-[length:200px_200px] w-full grow"></div>
          </div>
          <main className="z-10 relative px-8 pt-10 pb-[100px] flex flex-col  gap-3 ">
            {children}
          </main>
        </div>
      </div>
    </UserProvider>
  );
}
