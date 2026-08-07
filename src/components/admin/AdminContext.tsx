import { createContext, useContext } from "react";

interface AdminSession {
  access_token: string;
  user: any;
}

interface AdminContextType {
  session: AdminSession;
  onLogout: () => void;
}

export const AdminContext = createContext<AdminContextType | null>(null);

export function useAdminSession() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdminSession must be used inside AdminContext.Provider");
  return ctx;
}
