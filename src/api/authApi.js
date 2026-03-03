import { apiRequest } from "./apiClient";

// ===============================
// LOGIN API
// ===============================
export const loginApi = (employee_code, password) => {
  return apiRequest({
    method: "POST",
    url: "/auth/login",
    data: {
      employee_code,
      password,
    },
    showLoader: true, // optional (default true)
  });
};

// ===============================
// LOGOUT API
// ===============================
export const logoutApi = () => {
  return apiRequest({
    method: "POST",
    url: "/auth/logout",
    showLoader: false, // logout pe loader nahi chahiye toh false
  });
};