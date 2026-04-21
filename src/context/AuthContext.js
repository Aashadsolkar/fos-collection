// context/AuthContext.js

import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginNewApi, verifyNewApi, logoutApi } from "../api/authApi";
import { setLogoutHandler } from "../utils/logoutHandler";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===============================
  // Bridge between auth context and axiosInstance
  // ===============================
  useEffect(() => {
    setLogoutHandler(logout);
  }, []);

  // ===============================
  // CHECK STORED TOKEN ON APP START
  // ===============================
  useEffect(() => {
    checkStoredAuth();
  }, []);

  const checkStoredAuth = async () => {
    try {
      const savedToken = await AsyncStorage.getItem("userToken");
      const savedUser = await AsyncStorage.getItem("userData");

      if (savedToken) setToken(savedToken);
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch (error) {
      console.log("Auth restore error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // STEP 1: LOGIN → returns checksum
  // Navigator ko checksum pass karo, fir PasscodeScreen pe navigate karo
  // ===============================
  const login = async (username, password) => {
    const res = await loginNewApi(username, password);

    if (res.success && res.data?.status === "success") {
      const checksum = res.data.data.checksum;
      return { success: true, checksum };
    } else {
      return {
        success: false,
        message:
          res.error?.message || res.data?.message || "Login failed",
      };
    }
  };

  // ===============================
  // STEP 2: VERIFY → sets token & user
  // ===============================
  const verifyPasscode = async (checksum, passcode) => {
    const res = await verifyNewApi(checksum, passcode);

    if (res.success && res.data?.status === "success") {
      const accessToken = res.data.data.access_token;
      const userData = res.data.data.user;

      await AsyncStorage.setItem("userToken", accessToken);
      await AsyncStorage.setItem("userData", JSON.stringify(userData));

      setToken(accessToken);
      setUser(userData);

      return { success: true };
    } else {
      return {
        success: false,
        message:
          res.error?.message || res.data?.message || "Verification failed",
      };
    }
  };

  // ===============================
  // LOGOUT FUNCTION
  // ===============================
  const logout = async () => {
    try {
      setLoading(true);
      const savedToken = await AsyncStorage.getItem("userToken");
      if (savedToken) await logoutApi(savedToken);
    } catch (error) {
      console.log("Logout API error:", error);
    } finally {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userData");
      setToken(null);
      setUser(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        login,
        verifyPasscode,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};