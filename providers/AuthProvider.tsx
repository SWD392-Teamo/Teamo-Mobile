import { getCurrentUser } from "@/actions/authActions";
import { AuthContext } from "@/context/AuthContext";
import { useAuthStore } from "@/hooks/useAuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePathname } from "expo-router";
import { ReactNode, useContext, useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useLoading } from "./LoadingProvider";

// useGlobalContext Hook
export const useGlobalContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

type Props = {
  children?: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const { showLoading, hideLoading } = useLoading();
  const pathName = usePathname();

  // Put all auth state into a single object
  const auth = useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      currentUser: state.currentUser,
    }))
  );

  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const reset = useAuthStore((state) => state.reset);

  // Get the current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        showLoading()
        const res = await getCurrentUser();
        if (res) {
          // If the user exists then persist login
          setIsAuthenticated(true);
          setCurrentUser(res);
        } else {
          // Else reset authentication state
          console.log("User not found: " + res)
          AsyncStorage.removeItem("authToken");
          reset();
        }

        // Throw error if user is unauthorized
        if(res?.error) {
          throw res.error;
        }
      } catch (error: any) {
        console.log("Failed to fetch current user:", error.message);
        AsyncStorage.removeItem("authToken");
        reset(); // Ensure the user is logged out on error
      } finally {
        hideLoading();
      }
    };

    fetchCurrentUser();
  }, [setIsAuthenticated, setCurrentUser, reset, pathName]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: auth.isAuthenticated,
        currentUser: auth.currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}