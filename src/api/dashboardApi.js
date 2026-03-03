// src/api/dashboardApi.js

import { apiRequest } from "./apiClient";


export const getDashboardSummary = async ({ period, date }) => {
  return await apiRequest({
    method: "GET",
    url: "/home",
    params: date ? { date } : { period },
  });
};