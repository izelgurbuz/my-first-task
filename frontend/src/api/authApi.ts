import axiosInstance from "./axiosInstance";

export interface User {}
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post("/login", {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const register = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post("/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    return error;
  }
};
