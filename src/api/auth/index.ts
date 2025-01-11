import { REFRESH_TOKEN_KEY } from "@/data/constants";
import { LoginInfo, RegisterInfo } from "@/interfaces/auth";
import { LocalStorageService } from "@/services/LocalStorageService";
import axios from "axios";
import { axiosInstance } from "../axiosInstance";

export const login = (loginInfo: LoginInfo) => {
  return axiosInstance.post("/iam/auth/login", loginInfo);
};
export const register = (registerInfo: RegisterInfo) => {
  return axiosInstance.post("/iam/auth/signup", {
    email: registerInfo.email,
    phone: registerInfo.phone,
    password: registerInfo.password,
    first_name: registerInfo.firstName,
    last_name: registerInfo.lastName,
  });
};

export const getAccessToken = async () => {
  try {
    const refreshToken = LocalStorageService.get(REFRESH_TOKEN_KEY);
    if (!refreshToken) return null;

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/iam/auth/token/refresh`,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
