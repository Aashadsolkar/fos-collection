import React, { createContext, useContext, useState } from "react";
import { createDispositionApi } from "../api/dispositionApi";

const DispositionFormContext = createContext();

export const DispositionFormProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const submitDisposition = async (payload) => {
    try {
      setLoading(true);

      const res = await createDispositionApi({payload});

      return {
        success: true,
        data: res,
      };
    } catch (error) {
      console.log("Disposition API Error:", error);

      return {
        success: false,
        error: error?.message || "Something went wrong",
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <DispositionFormContext.Provider
      value={{
        submitDisposition,
        loading,
      }}
    >
      {children}
    </DispositionFormContext.Provider>
  );
};

export const useDispositionForm = () => {
  const context = useContext(DispositionFormContext);

  if (!context) {
    throw new Error(
      "useDispositionForm must be used inside DispositionFormProvider"
    );
  }

  return context;
};