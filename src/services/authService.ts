import { apiClient } from "./apiClient";
import type { SignInData, SignUpData } from "../types/auth";

export const authService = {
  signup: async (data: SignUpData) => {
    try {
      const response = await apiClient.post("/auth/signup", data);
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || "Error al registrar usuario" };
    }
  },

  signin: async (data: SignInData) => {
    try {
      const response = await apiClient.post("/auth/signin", data);
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || "Error al iniciar sesión" };
    }
  },

  signout: async () => {
    try {
      const response = await apiClient.post("/auth/signout");
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || "Error al cerrar sesión" };
    }
  },
};
