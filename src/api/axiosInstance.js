import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  triggerLoaderStart,
  triggerLoaderStop,
} from "../utils/loaderHandler";
import { triggerLogout } from "../utils/logoutHandler";
import { triggerError } from "../utils/errorHandler";

const axiosInstance = axios.create({
  baseURL: "https://collection.webiknows.cloud/api/tenant/fos",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===============================
// REQUEST INTERCEPTOR
// ===============================
axiosInstance.interceptors.request.use(
  async (config) => {
    // Default loader ON (unless disabled)
    if (config.showLoader !== false) {
      triggerLoaderStart();
    }

    const token = await AsyncStorage.getItem("userToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    triggerLoaderStop();
    return Promise.reject(error);
  }
);

// ===============================
// RESPONSE INTERCEPTOR
// ===============================
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.config.showLoader !== false) {
      triggerLoaderStop();
    }
    return response;
  },
  async (error) => {
    if (error.config?.showLoader !== false) {
      triggerLoaderStop();
    }
    
    if (error.response?.status === 401) {
      triggerLogout();
    } else {
      const message =
        error.response?.data?.message || "Something went wrong";
      triggerError(message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;