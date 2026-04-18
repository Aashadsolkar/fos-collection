// context/SuccessContext.js
import React, { createContext, useState } from "react";

export const SuccessContext = createContext();

export const SuccessProvider = ({ children }) => {
  const [success, setSuccess] = useState("");

  const showSuccess = (message) => {
    setSuccess(message);

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  return (
    <SuccessContext.Provider value={{ success, showSuccess }}>
      {children}
    </SuccessContext.Provider>
  );
};