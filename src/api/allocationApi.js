import { apiRequest } from "./apiClient";

// ===============================
// GET ALLOCATIONS
// ===============================
export const getAllocationsApi = ({
  page = 1,
  per_page = 10
}) => {
  let url = `allocations?page=${page}&per_page=${per_page}`;

  return apiRequest({
    method: "GET",
    url,
    showLoader: true,
  });
};