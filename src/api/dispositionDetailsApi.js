import { apiRequest } from "./apiClient";

export const getDispositionDetailsApi = (id) => {
  return apiRequest({
    method: "GET",
    url: `/dispositions/${id}`,
  });
};