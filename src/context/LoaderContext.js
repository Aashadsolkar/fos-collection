import React, { createContext, useState, useEffect } from "react";
import { setLoaderHandler } from "../utils/loaderHandler";

export const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const showLoader = () => {
    setLoadingCount(prev => prev + 1);
  };

  const hideLoader = () => {
    setLoadingCount(prev => (prev > 0 ? prev - 1 : 0));
  };

  useEffect(() => {
    setLoaderHandler({ showLoader, hideLoader });
  }, []);

  return (
    <LoaderContext.Provider
      value={{
        loading: loadingCount > 0,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
};