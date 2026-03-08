import { apiRequest } from "./apiClient";

export const getNotificationsApi = (page = 1, per_page = 10,) => {
    return apiRequest({
        method: "GET",
        url: `/notifications?page=${page}&per_page=${per_page}`
    });
};

export const markNotificationReadApi = (id) => {
    return apiRequest({
        method: "POST",
        url: `/notifications/${id}/read`
    });
};