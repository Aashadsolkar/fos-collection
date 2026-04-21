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
    console.log(response, "_______________");
    
    return response;
  },
  async (error) => {
     console.log("log 1")
    if (error.config?.showLoader !== false) {
       console.log("log 2")
      triggerLoaderStop();
    }
    
    if (error.response?.status === 401) {
      triggerLogout();
       console.log("log 3")
       console.log(error.response,"log 3")
    } else {
       console.log("log 4")
      const message =
      error.response?.data?.message || "Something went wrong";
      triggerError(message);
       console.log("log 5")
    }
 console.log("log 6")
    return Promise.reject(error);
  }
);

export default axiosInstance;