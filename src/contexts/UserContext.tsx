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

interface UserContextType {
  logout: () => void;
}
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
      const _refreshToken = LocalStorageService.get<string | null>(REFRESH_TOKEN_KEY);

    if (!_token) {
      if(!_refreshToken){
        router.push(`/login?redirect=${pathname}`);
      }
    }
    setToken(_token || _refreshToken);
  }, []);

  const logout = () => {
    LocalStorageService.clear();
  };
  return (
    <UserContext.Provider value={{ logout }}>
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
