import { apiRequest } from "./apiClient";

export const getProfileApi = () => {
    return apiRequest({
        method: "GET",
        url: `/auth/me`
    });
};