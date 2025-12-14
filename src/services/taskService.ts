import { apiClient } from "./apiClient";
import type { Task } from "../types/task";

interface TaskResponse {
  success: boolean;
  message: string;
  data: {
    tasks: Task[];
  };
}

export const taskService = {
  getTasks: async (): Promise<Task[]> => {
    const response = await apiClient.get<TaskResponse>("/tasks");
    return response.data.data.tasks;
  },

  getDeletedTasks: async (): Promise<Task[]> => {
    const response = await apiClient.get<TaskResponse>("/tasks/deleted");
    return response.data.data.tasks;
  },

  getTaskById: async (id: string): Promise<Task> => {
    const response = await apiClient.get<{ success: boolean; message: string; data: Task }>("/tasks/" + id);
    return response.data.data;
  },

  createTask: async (task: Partial<Task>): Promise<Task> => {
    const response = await apiClient.post<{ success: boolean; message: string; data: Task }>("/tasks", task);
    return response.data.data;
  },

  updateTask: async (id: string, updates: Partial<Task>): Promise<Task> => {
    const response = await apiClient.put<{ success: boolean; message: string; data: Task }>(`/tasks/${id}`, updates);
    return response.data.data;
  },

  softDeleteTask: async (id: string) => {
    const response = await apiClient.delete(`/tasks/${id}`);
    return response.data;
  },

  hardDeleteTask: async (id: string) => {
    const response = await apiClient.delete(`/tasks/hard/${id}`);
    return response.data;
  },

  restoreTask: async (id: string) => {
    const response = await apiClient.patch(`/tasks/restore/${id}`);
    return response.data;
  },
};
