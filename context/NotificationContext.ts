import { createContext } from "react";

export const NotificationContext = createContext({
  loaded: false,
  setLoaded: (value: boolean) => {}
});
