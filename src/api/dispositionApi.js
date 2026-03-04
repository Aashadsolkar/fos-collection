import { apiRequest } from "./apiClient";

export const getDispositionsApi = ({
  page = 1,
  per_page = 10,
  period = "yesterday",
}) => {
  return apiRequest({
    method: "GET",
    url: `/dispositions?page=${page}&per_page=${per_page}&period=${period}`,
  });
};