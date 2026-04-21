import { apiRequest } from "./apiClient";

// ===============================
// LOGIN API
// ===============================
export const loginNewApi = (username, password) => {
  return apiRequest({
    method: "POST",
    url: "/auth/loginnew",
    data: {
      username,
      password,
    },
    showLoader: true, // optional (default true)
  });
};

// ===============================
// LOGIN API
// ===============================
export const verifyNewApi = (checksum, passcode) => {
  return apiRequest({
    method: "POST",
    url: "/auth/verifynew",
    data: { checksum, passcode },
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