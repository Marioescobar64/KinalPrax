import { axiosAuth } from "./api";

export const login = async (data) => api.post("/auth/login", data);
export const logout = async () => api.post("/auth/logout");
export const refreshToken = async (refreshToken) => api.post("/auth/refresh", { refreshToken });
export const forgotPassword = async (email) => api.post("/auth/forgot-password", { email });
export const resetPassword = async (token, newPassword) => api.post("/auth/reset-password", { token, newPassword });
export const verifyEmail = async (token) => api.post("/auth/verify-email", { token });
