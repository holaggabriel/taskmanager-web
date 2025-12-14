import { apiClient } from "./apiClient";
import type { User } from "../types/user";

export const userService = {
  getMyData: async (): Promise<{ success: boolean; user?: User; message?: string }> => {
    try {
      const response = await apiClient.get("/users/me");
      const user = response.data.data.user;

      return { 
        success: response.data.success, 
        message: response.data.message, 
        user: user as User 
      };
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || "Not authenticated" };
    }
  },
};

