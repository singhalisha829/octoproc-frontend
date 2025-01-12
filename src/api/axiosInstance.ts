import { ACCESS_TOKEN_KEY } from "@/data/constants";
import { LocalStorageService } from "@/services/LocalStorageService";
import axios, { AxiosError } from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
  headers: {
    Authorization: "Bearer " + LocalStorageService.get(ACCESS_TOKEN_KEY),
  },
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
  (error: AxiosError) => {
    if (error) {
      console.log(error);
    }
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
