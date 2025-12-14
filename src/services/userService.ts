import { apiClient } from "./apiClient";
import type { User } from "../types/user";

export const fetchUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>("/users");
  return response.data;
};
