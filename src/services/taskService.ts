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
  getTasks: async (): Promise<{ success: boolean; tasks?: Task[]; message?: string }> => {
    try {
      const response = await apiClient.get<TaskResponse>("/tasks");
      return {
        success: response.data.success,
        tasks: response.data.data.tasks,
        message: response.data.message
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch tasks"
      };
    }
  },

  getDeletedTasks: async (): Promise<{ success: boolean; tasks?: Task[]; message?: string }> => {
    try {
      const response = await apiClient.get<TaskResponse>("/tasks/deleted");
      return {
        success: response.data.success,
        tasks: response.data.data.tasks,
        message: response.data.message
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch deleted tasks"
      };
    }
  },

  getTaskById: async (id: string): Promise<{ success: boolean; task?: Task; message?: string }> => {
    try {
      const response = await apiClient.get<{ success: boolean; message: string; data: Task }>(
        `/tasks/${id}`
      );
      return {
        success: response.data.success,
        task: response.data.data,
        message: response.data.message
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch task"
      };
    }
  },

  createTask: async (task: Partial<Task>): Promise<{ success: boolean; task?: Task; message?: string }> => {
    try {
      const response = await apiClient.post<{ success: boolean; message: string; data: Task }>(
        "/tasks",
        task
      );
      return {
        success: response.data.success,
        task: response.data.data,
        message: response.data.message
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to create task"
      };
    }
  },

  updateTask: async (id: string, updates: Partial<Task>): Promise<{ success: boolean; task?: Task; message?: string }> => {
    try {
      const response = await apiClient.put<{ success: boolean; message: string; data: Task }>(
        `/tasks/${id}`,
        updates
      );
      return {
        success: response.data.success,
        task: response.data.data,
        message: response.data.message
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update task"
      };
    }
  },

  softDeleteTaskById: async (id: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await apiClient.delete<{ success: boolean; message: string }>(`/tasks/${id}/soft`);
      return {
        success: response.data.success,
        message: response.data.message
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to soft delete task"
      };
    }
  },

  softDeleteAllTasks: async (): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await apiClient.delete<{ success: boolean; message: string }>(`/tasks/soft`);
      return {
        success: response.data.success,
        message: response.data.message
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to soft delete all tasks"
      };
    }
  },

  hardDeleteTaskById: async (id: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await apiClient.delete<{ success: boolean; message: string }>(`/tasks/${id}/hard`);
      return {
        success: response.data.success,
        message: response.data.message
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to hard delete task"
      };
    }
  },

  hardDeleteAllTasks: async (): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await apiClient.delete<{ success: boolean; message: string }>(`/tasks/hard`);
      return {
        success: response.data.success,
        message: response.data.message
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to hard delete all tasks"
      };
    }
  },

  restoreTaskById: async (id: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await apiClient.patch<{ success: boolean; message: string }>(`/tasks/${id}/restore`);
      return {
        success: response.data.success,
        message: response.data.message
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to restore task"
      };
    }
  },

  restoreAllTasks: async (): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await apiClient.patch<{ success: boolean; message: string }>(`/tasks/restore`);
      return {
        success: response.data.success,
        message: response.data.message
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to restore all tasks"
      };
    }
  },
};
