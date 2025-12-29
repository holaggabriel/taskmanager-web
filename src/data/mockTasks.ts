export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  isDeleted?: boolean;
}

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Diseñar wireframes de la aplicación',
    description: 'Crear los wireframes para las pantallas principales de la aplicación móvil, incluyendo la pantalla de inicio, el dashboard y las vistas de detalle.',
    status: 'completed',
    createdAt: '2024-12-20',
  },
  {
    id: '2',
    title: 'Implementar sistema de autenticación',
    description: 'Desarrollar el módulo de login y registro con validación de campos y manejo de errores.',
    status: 'in_progress',
    createdAt: '2024-12-22',
  },
  {
    id: '3',
    title: 'Revisar documentación del API',
    description: 'Analizar la documentación del backend para entender los endpoints disponibles y su estructura de datos.',
    status: 'pending',
    createdAt: '2024-12-25',
  },
  {
    id: '4',
    title: 'Crear componentes reutilizables',
    description: 'Desarrollar una librería de componentes UI reutilizables: botones, inputs, cards, modales, etc.',
    status: 'in_progress',
    createdAt: '2024-12-26',
  },
  {
    id: '5',
    title: 'Configurar CI/CD pipeline',
    description: 'Establecer el flujo de integración y despliegue continuo con GitHub Actions.',
    status: 'pending',
    createdAt: '2024-12-27',
  },
  {
    id: '6',
    title: 'Optimizar rendimiento de imágenes',
    description: 'Implementar lazy loading y compresión automática de imágenes para mejorar los tiempos de carga.',
    status: 'completed',
    createdAt: '2024-12-18',
  },
];

export const mockDeletedTasks: Task[] = [
  {
    id: '7',
    title: 'Migrar base de datos legacy',
    description: 'Transferir datos del sistema antiguo al nuevo esquema de base de datos.',
    status: 'pending',
    createdAt: '2024-12-10',
    isDeleted: true,
  },
  {
    id: '8',
    title: 'Actualizar dependencias obsoletas',
    description: 'Revisar y actualizar todas las librerías con vulnerabilidades conocidas.',
    status: 'completed',
    createdAt: '2024-12-12',
    isDeleted: true,
  },
];

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
