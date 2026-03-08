import React, { createContext, useContext, useState } from "react";
import { getDispositionDetailsApi } from "../api/dispositionDetailsApi";

const DispositionDetailsContext = createContext();

export const DispositionDetailsProvider = ({ children }) => {

  const [details, setDetails] = useState(null);

  const fetchDispositionDetails = async (id) => {
    try {

      const res = await getDispositionDetailsApi(id);
      if (res.success && res.data?.status === "success") {
        setDetails(res.data.data);
      }

    } catch (error) {
      console.log("Disposition Details Error:", error);
    }
  };

  return (
    <DispositionDetailsContext.Provider
      value={{
        details,
        fetchDispositionDetails,
      }}
    >
      {children}
    </DispositionDetailsContext.Provider>
  );
};

export const useDispositionDetails = () =>
  useContext(DispositionDetailsContext);