import { apiClient } from "./apiClient";
import type { User } from "../types/user";

export const userService = {
  getMyData: async (): Promise<{ success: boolean; user?: User; message?: string }> => {
    try {
      const response = await apiClient.get("/users/me");
      console.log(response)
      return { success: response.data.success, message: response.data.message, user: response.data.user as User };
    } catch (error: any) {
      console.log({ success: false, message: error.response?.data?.message || "Not authenticated" })
      return { success: false, message: error.response?.data?.message || "Not authenticated" };
    }
  },
};
