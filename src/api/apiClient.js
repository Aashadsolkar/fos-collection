import axiosInstance from "./axiosInstance";

export const apiRequest = async ({
  method = "GET",
  url,
  data = null,
  params = null,
  headers = {},
  showLoader = true,
}) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      params,
      headers,
      showLoader,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || {
        message: "Something went wrong",
      },
    };
  }
};