import React, { createContext, useContext, useState } from "react";
import { changePasswordApi } from "../api/changePasswordApi";

const ChangePasswordContext = createContext();

export const ChangePasswordProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);

  const changePassword = async (payload) => {
    try {

      setLoading(true);

      const res = await changePasswordApi({payload});

      return {
        success: true,
        data: res,
      };

    } catch (error) {

      return {
        success: false,
        message: error?.message || "Something went wrong",
      };

    } finally {
      setLoading(false);
    }
  };

  return (
    <ChangePasswordContext.Provider
      value={{
        changePassword,
        loading,
      }}
    >
      {children}
    </ChangePasswordContext.Provider>
  );
};

export const useChangePassword = () => useContext(ChangePasswordContext);