// src/api/dashboardApi.js

import { apiRequest } from "./apiClient";


export const changePasswordApi = async ({ payload }) => {
  return await apiRequest({
    method: "POST",
    url: "/auth/change-password",
    data: payload
  });
};