import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useProfile } from "./ProfileContext";
import { useNotification } from "./NotificationContext";

export const AppInitContext = createContext();

export const AppInitProvider = ({ children }) => {

  const { token } = useContext(AuthContext);
  const { fetchProfile } = useProfile();
  const { fetchNotifications } = useNotification();
  const [appReady, setAppReady] = useState(false);

  const initializeApp = async () => {
    try {
      await Promise.all([
        fetchProfile({ showLoader: false }),
        fetchNotifications({ showLoader: false }),
      ]);
    } catch (err) {
      console.log("Init error", err);
    } finally {
      setAppReady(true);
    }
  };

  useEffect(() => {
    if (token) {
      setAppReady(false);
      initializeApp();
    }
  }, [token]);

  return (
    <AppInitContext.Provider value={{ appReady }}>
      {children}
    </AppInitContext.Provider>
  );
};

export const useAppInit = () => useContext(AppInitContext);