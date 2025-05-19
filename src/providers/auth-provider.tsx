import { useLocalStorage } from "@/hooks/use-local-storage";
import React, { createContext, use } from "react";

export type AuthContextType = {
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token] = useLocalStorage<string>("accessToken");

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthProvider = () => {
  const context = use(AuthContext);

  if (!context) throw new Error("useAuth should be inside AuthContext");

  return context;
};
