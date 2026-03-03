import React, { createContext, useEffect, useState } from "react";
import { setErrorHandler } from "../utils/errorHandler";

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
  setErrorHandler(showError);
}, []);

  const showError = (message) => {
    setError(message);

    // auto hide after 3 sec
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <ErrorContext.Provider
      value={{
        error,
        showError,
        clearError,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};