import requestUserPermissionAndListen from "@/lib/getUserPermission";
import { createContext, ReactNode, useContext, useEffect } from "react";

const NotificationContext = createContext(null);

// Custom hook to access notification context
export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotificationContext must be used within a NotificationProvider");
  }
  return context;
};

type Props = {
  children?: ReactNode;
};

export default function NotificationProvider({ children }: Props) {
  useEffect(() => {
    let unsubscribe: (() => void) | null;

    const setup = async () => {
      // Handle notifications setup
      unsubscribe = await requestUserPermissionAndListen();
    };

    setup();

    // Cleanup function
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <NotificationContext.Provider value={null}>
      {children}
    </NotificationContext.Provider>
  );
}
