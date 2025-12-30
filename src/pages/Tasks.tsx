import { useState, useEffect, useCallback } from 'react';
import type { Task } from '@/types/task';
import { taskService } from '@/services/taskService';
import MainLayout from '@/components/layout/MainLayout';
import TaskCard from '@/components/tasks/TaskCard';
import TaskTable from '@/components/tasks/TaskTable';
import TaskFormDialog from '@/components/tasks/TaskFormDialog';
import TaskDetailDialog from '@/components/tasks/TaskDetailDialog';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import EmptyState from '@/components/common/EmptyState';
import { TaskCardSkeleton, TaskTableSkeleton } from '@/components/common/LoadingSkeletons';
import { Button } from '@/components/ui/button';
import { Plus, LayoutGrid, List } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [formOpen, setFormOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { toast } = useToast();

  const loadTasks = useCallback(
    async (showSkeleton: boolean = false) => {
      if (showSkeleton) {
        setIsLoading(true);
      }

      try {
        const response = await taskService.getTasks();
        if (response.success) {
          setTasks(response.tasks ?? []);
        } else {
          toast({
            title: 'Error',
            description: response.message ?? 'No se pudieron cargar las tareas',
            variant: 'destructive',
          });
        }
      } catch {
        toast({
          title: 'Error',
          description: 'Error de conexión con el servidor',
          variant: 'destructive',
        });
      } finally {
        if (showSkeleton) {
          setIsLoading(false);
        }
      }
    },
    [toast]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      loadTasks(true);
    }, 800);

    return () => clearTimeout(timer); // limpiar el timer si el componente se desmonta
  }, [loadTasks]);


  const handleView = (task: Task) => { setSelectedTask(task); setDetailOpen(true); };
  const handleEdit = (task: Task) => { setSelectedTask(task); setFormOpen(true); };
  const handleDelete = (task: Task) => { setSelectedTask(task); setDeleteOpen(true); };

  const confirmDelete = async () => {
    if (!selectedTask) return;

    try {
      const res = await taskService.softDeleteTaskById(selectedTask.id);
      if (!res.success) throw new Error(res.message);

      toast({
        title: 'Tarea eliminada',
        description: 'La tarea se movió a la papelera.',
      });

      await loadTasks();
    } catch {
      toast({
        title: 'Error',
        description: 'No se pudo eliminar la tarea',
        variant: 'destructive',
      });
    } finally {
      setDeleteOpen(false);
      setDetailOpen(false);
      setSelectedTask(null);
    }

  };

  const handleSave = async (taskData: Partial<Task>) => {

    try {
      if (taskData.id) {
        const res = await taskService.updateTask(taskData.id, taskData);
        if (!res.success) throw new Error(res.message);
        toast({ title: 'Tarea actualizada' });
      } else {
        const res = await taskService.createTask(taskData);
        if (!res.success) throw new Error(res.message);
        toast({ title: 'Tarea creada' });
      }

      await loadTasks();
      setFormOpen(false);
      setSelectedTask(null);
    } catch {
      toast({
        title: 'Error',
        description: 'No se pudo guardar la tarea',
        variant: 'destructive',
      });
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Mis Tareas</h1>
            <p className="text-muted-foreground">{tasks.length} tareas en total</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex border rounded-lg p-1">
              <Button variant={viewMode === 'cards' ? 'secondary' : 'ghost'} size="sm" onClick={() => setViewMode('cards')}><LayoutGrid className="h-4 w-4" /></Button>
              <Button variant={viewMode === 'table' ? 'secondary' : 'ghost'} size="sm" onClick={() => setViewMode('table')}><List className="h-4 w-4" /></Button>
            </div>
            <Button onClick={() => { setSelectedTask(null); setFormOpen(true); }}><Plus className="h-4 w-4 mr-2" />Nueva Tarea</Button>
          </div>
        </div>

        {isLoading ? (
          viewMode === 'cards' ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[1, 2, 3, 4, 5, 6].map(i => <TaskCardSkeleton key={i} />)}</div>
          ) : <TaskTableSkeleton />
        ) : tasks.length === 0 ? (
          <EmptyState title="No hay tareas" description="Crea tu primera tarea para comenzar a organizar tu trabajo." action={<Button onClick={() => setFormOpen(true)}><Plus className="h-4 w-4 mr-2" />Crear Tarea</Button>} />
        ) : viewMode === 'cards' ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{tasks.map(task => <TaskCard key={task.id} task={task} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />)}</div>
        ) : (
          <TaskTable tasks={tasks} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>

      <TaskFormDialog open={formOpen} onOpenChange={setFormOpen} task={selectedTask} onSave={handleSave} />
      <TaskDetailDialog open={detailOpen} onOpenChange={setDetailOpen} task={selectedTask} onEdit={handleEdit} onDelete={handleDelete} />
      <ConfirmDialog open={deleteOpen} onOpenChange={setDeleteOpen} title="¿Eliminar tarea?" description="La tarea se moverá a la papelera." confirmLabel="Eliminar" onConfirm={confirmDelete} />
    </MainLayout>
  );
}
