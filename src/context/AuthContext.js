import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginApi, logoutApi } from "../api/authApi";
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

            if (savedToken) {
                setToken(savedToken);
            }

            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        } catch (error) {
            console.log("Auth restore error:", error);
        } finally {
            setLoading(false);
        }
    };

    // ===============================
    // LOGIN FUNCTION
    // ===============================
    const login = async (employee_code, password) => {
        const res = await loginApi(employee_code, password);
        console.log("login success", res);
        
        if (res.success && res.data?.status === "success") {
            const accessToken = res.data.data.access_token;
            const userData = res.data.data.user;

            await AsyncStorage.setItem("userToken", accessToken);
            await AsyncStorage.setItem(
                "userData",
                JSON.stringify(userData)
            );

            setToken(accessToken);
            setUser(userData);

            return { success: true };
        } else {
            return {
                success: false,
                message:
                    res.error?.message ||
                    res.data?.message ||
                    "Login failed",
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

            if (savedToken) {
                await logoutApi(savedToken);
            }
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
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};