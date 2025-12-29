import { Task, statusLabels, statusColors } from '@/data/mockTasks';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface TaskDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | null;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export default function TaskDetailDialog({
  open,
  onOpenChange,
  task,
  onEdit,
  onDelete,
}: TaskDetailDialogProps) {
  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4 pr-6">
            <DialogTitle className="text-xl leading-tight">
              {task.title}
            </DialogTitle>
            <Badge
              variant="outline"
              className={`shrink-0 ${statusColors[task.status]}`}
            >
              {statusLabels[task.status]}
            </Badge>
          </div>
          <DialogDescription className="sr-only">
            Detalle de la tarea
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Descripción
            </h4>
            <p className="text-sm leading-relaxed">{task.description}</p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              Creada el {format(new Date(task.createdAt), "d 'de' MMMM 'de' yyyy", { locale: es })}
            </span>
          </div>
        </div>

        <DialogFooter className="pt-4 flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => {
              onOpenChange(false);
              onEdit(task);
            }}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button
            variant="destructive"
            className="w-full sm:w-auto"
            onClick={() => {
              onOpenChange(false);
              onDelete(task);
            }}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
