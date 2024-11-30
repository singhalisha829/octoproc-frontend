import { ACCESS_TOKEN_KEY } from "@/data/constants";
import { LocalStorageService } from "@/services/LocalStorageService";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
});

// axios interceptor
axiosInstance.interceptors.request.use(
  (request) => {
    const token = LocalStorageService.get(ACCESS_TOKEN_KEY);
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.log(error.response);
    }
    if (
      error?.response?.data?.statusCode === 401 ||
      error?.response?.data?.statusCode === 403
    ) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
