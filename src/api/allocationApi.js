import { apiRequest } from "./apiClient";

// ===============================
// GET ALLOCATIONS
// ===============================
export const getAllocationsApi = ({
  page = 1,
  per_page = 10,
  period,
  untouched,
}) => {
  let url = `/allocations?page=${page}&per_page=${per_page}&period=${period}&untouched=${untouched}`;

  return apiRequest({
    method: "GET",
    url,
    showLoader: true,
  });
};

export const getAllocationDetailsApi = (id) => {
  return apiRequest({
    method: "GET",
    url: `/allocations/${id}`,
  });
};