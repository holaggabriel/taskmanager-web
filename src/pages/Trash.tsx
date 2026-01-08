import { useState, useEffect, useCallback } from 'react';
import type { Task } from '@/types/task';
import { taskService } from '@/services/taskService';
import MainLayout from '@/components/layout/MainLayout';
import TaskCard from '@/components/tasks/TaskCard';
import TaskTable from '@/components/tasks/TaskTable';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import EmptyState from '@/components/common/EmptyState';
import { TaskCardSkeleton } from '@/components/common/LoadingSkeletons';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List, RotateCcw, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Trash() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'restore' | 'delete' | 'restoreAll' | 'deleteAll'>('delete');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { toast } = useToast();

  const loadDeletedTasks = useCallback(
    async (showSkeleton: boolean = false) => {
      if (showSkeleton) {
        setIsLoading(true);
      }

      try {
        const res = await taskService.getDeletedTasks();
        if (res.success) {
          setTasks(res.tasks ?? []);
        } else {
          toast({
            title: 'Error',
            description: res.message ?? 'No se pudieron cargar las tareas eliminadas',
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
      loadDeletedTasks(true);
    }, 800);

    return () => clearTimeout(timer); // limpia el timer si el componente se desmonta
  }, [loadDeletedTasks]);

  const handleRestore = (task: Task) => { setSelectedTask(task); setConfirmAction('restore'); setConfirmOpen(true); };
  const handlePermanentDelete = (task: Task) => { setSelectedTask(task); setConfirmAction('delete'); setConfirmOpen(true); };

  const handleConfirm = async () => {
    try {
      if (confirmAction === 'restore' && selectedTask) {
        await taskService.restoreTaskById(selectedTask.id);
        toast({ title: 'Tarea restaurada' });
      }

      if (confirmAction === 'delete' && selectedTask) {
        await taskService.hardDeleteTaskById(selectedTask.id);
        toast({ title: 'Tarea eliminada permanentemente' });
      }

      if (confirmAction === 'restoreAll') {
        await taskService.restoreAllTasks();
        toast({ title: 'Todas las tareas restauradas' });
      }

      if (confirmAction === 'deleteAll') {
        await taskService.hardDeleteAllTasks();
        toast({ title: 'Papelera vaciada' });
      }

      await loadDeletedTasks();
    } catch {
      toast({
        title: 'Error',
        description: 'No se pudo completar la acción',
        variant: 'destructive',
      });
    } finally {
      setConfirmOpen(false);
      setSelectedTask(null);
    }
  };


  const confirmTexts = {
    restore: { title: '¿Restaurar tarea?', desc: 'La tarea volverá a tu lista principal.', label: 'Restaurar' },
    delete: { title: '¿Eliminar permanentemente?', desc: 'Esta acción no se puede deshacer.', label: 'Eliminar' },
    restoreAll: { title: '¿Restaurar todas?', desc: 'Todas las tareas volverán a tu lista.', label: 'Restaurar Todas' },
    deleteAll: { title: '¿Vaciar papelera?', desc: 'Se eliminarán todas las tareas permanentemente.', label: 'Vaciar' },
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div><h1 className="text-2xl font-bold tracking-tight">Papelera</h1><p className="text-muted-foreground">{tasks.length} tareas eliminadas</p></div>
          <div className="flex items-center gap-2 flex-wrap">
            {tasks.length > 0 && (<>
              <Button variant="outline" size="sm" onClick={() => { setConfirmAction('restoreAll'); setConfirmOpen(true); }}><RotateCcw className="h-4 w-4 mr-2" />Restaurar Todas</Button>
              <Button variant="destructive" size="sm" onClick={() => { setConfirmAction('deleteAll'); setConfirmOpen(true); }}><Trash2 className="h-4 w-4 mr-2" />Vaciar</Button>
            </>)}
            <div className="flex border rounded-lg p-1">
              <Button variant={viewMode === 'cards' ? 'secondary' : 'ghost'} size="sm" onClick={() => setViewMode('cards')}><LayoutGrid className="h-4 w-4" /></Button>
              <Button variant={viewMode === 'table' ? 'secondary' : 'ghost'} size="sm" onClick={() => setViewMode('table')}><List className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>

        {isLoading ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[1, 2, 3].map(i => <TaskCardSkeleton key={i} />)}</div>
          : tasks.length === 0 ? <EmptyState title="Papelera vacía" description="Las tareas eliminadas aparecerán aquí." />
            : viewMode === 'cards' ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{tasks.map(t => <TaskCard key={t.id} task={t} isTrash onView={() => { }} onEdit={() => { }} onDelete={() => { }} onRestore={handleRestore} onPermanentDelete={handlePermanentDelete} />)}</div>
              : <TaskTable tasks={tasks} isTrash onView={() => { }} onEdit={() => { }} onDelete={() => { }} onRestore={handleRestore} onPermanentDelete={handlePermanentDelete} />}
      </div>
      <ConfirmDialog open={confirmOpen} onOpenChange={setConfirmOpen} title={confirmTexts[confirmAction].title} description={confirmTexts[confirmAction].desc} confirmLabel={confirmTexts[confirmAction].label} variant={confirmAction.includes('delete') ? 'destructive' : 'default'} onConfirm={handleConfirm} />
    </MainLayout>
  );
}
