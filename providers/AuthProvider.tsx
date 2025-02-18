import { getCurrentUser } from "@/actions/authActions";
import { AuthContext } from "@/context/AuthContext";
import { useAuthStore } from "@/hooks/useAuthStore";
import { ReactNode, useContext, useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

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
  const [loading, setLoading] = useState(true);

  // Put all auth state into a single object
  const auth = useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      currentUser: state.currentUser,
      token: state.token,
    }))
  );

  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const reset = useAuthStore((state) => state.reset);

  // Get the current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await getCurrentUser();
        if (res) {
          // If the user exists then persist login
          setIsAuthenticated(true);
          setCurrentUser(res);
        } else {
          // Else reset authentication state
          reset();
        }
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        reset(); // Ensure the user is logged out on error
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [setIsAuthenticated, setCurrentUser, reset]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: auth.isAuthenticated,
        currentUser: auth.currentUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}