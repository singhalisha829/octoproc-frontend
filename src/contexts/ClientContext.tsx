"use client"
import { createContext, useContext, useState, useEffect } from "react";
import { LocalStorageService } from "@/services/LocalStorageService";
import { SELECTED_CLIENT } from "@/data/constants";

interface ClientContextType {
  selectedClient: number | null;
  setSelectedClient: (id: number | null) => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedClient, setSelectedClient] = useState<number | null>(
    LocalStorageService.get(SELECTED_CLIENT)
  );

  useEffect(() => {
    LocalStorageService.set(SELECTED_CLIENT, selectedClient);
  }, [selectedClient]);

  return (
    <ClientContext.Provider value={{ selectedClient, setSelectedClient }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClient must be used within a ClientProvider");
  }
  return context;
};
