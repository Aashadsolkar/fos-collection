import { apiRequest } from "./apiClient";

export const sendPaymentLink = (
  payload
) => {
  return apiRequest({
    method: "POST",
    url: `/payments/link`,
    data: payload,
    showLoader: false
  });
};