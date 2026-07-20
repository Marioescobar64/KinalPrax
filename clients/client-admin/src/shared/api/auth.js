import { axiosAuth } from "./api";

export const login = async (data) => axiosAuth.post("/auth/login", data);
export const logout = async () => axiosAuth.post("/auth/logout");
export const refreshToken = async (refreshToken) => axiosAuth.post("/auth/refresh", { refreshToken });
export const forgotPassword = async (email) => axiosAuth.post("/auth/forgot-password", { email });
export const resetPassword = async (token, newPassword) => axiosAuth.post("/auth/reset-password", { token, newPassword });
export const verifyEmail = async (token) => axiosAuth.post("/auth/verify-email", { token });
