export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export const statusLabels: Record<TaskStatus, string> = {
  pending: 'Pendiente',
  in_progress: 'En Progreso',
  completed: 'Completada',
};

export const statusColors: Record<TaskStatus, string> = {
  pending: 'bg-warning/10 text-warning border-warning/20',
  in_progress: 'bg-primary/10 text-primary border-primary/20',
  completed: 'bg-success/10 text-success border-success/20',
};
