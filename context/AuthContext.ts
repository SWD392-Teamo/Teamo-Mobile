import { createContext } from "react";
import { AuthContextType } from "@/types/auth";

// Define the context with a default value of null and the correct type
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  currentUser: null
});