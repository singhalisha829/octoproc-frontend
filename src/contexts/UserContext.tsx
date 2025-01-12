"use client";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/data/constants";
import { LocalStorageService } from "@/services/LocalStorageService";
import { usePathname, useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextType {}
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const _token =
      LocalStorageService.get<string | null>(ACCESS_TOKEN_KEY) || "";

    const _refreshToken = LocalStorageService.get(REFRESH_TOKEN_KEY);
    if (!_token || !_refreshToken) {
      router.push(`/login?redirect=${pathname}`);
    }
    setToken(_token);
  }, []);

  return (
    <UserContext.Provider value={{}}>
      {token ? children : null}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
