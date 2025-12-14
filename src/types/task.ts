export interface Task {
  id: string;                     // UUID
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed"; // estado de la tarea
  createdAt: string;              // ISO date string
  updatedAt: string;              // ISO date string
  deleted_at: string | null;      // null si no está eliminada
}
