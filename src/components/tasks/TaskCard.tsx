import { statusLabels, statusColors } from '@/domain/tasks/status';
import type { Task } from '@/types/task';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Pencil, Trash2, RotateCcw, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface TaskCardProps {
  task: Task;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onRestore?: (task: Task) => void;
  onPermanentDelete?: (task: Task) => void;
  isTrash?: boolean;
}

export default function TaskCard({
  task,
  onView,
  onEdit,
  onDelete,
  onRestore,
  onPermanentDelete,
  isTrash = false,
}: TaskCardProps) {
  return (
    <Card className="group hover:shadow-md transition-all duration-200 animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2">
            {task.title}
          </h3>
          <Badge
            variant="outline"
            className={`shrink-0 ${statusColors[task.status]}`}
          >
            {statusLabels[task.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {task.description}
        </p>
        <p className="text-xs text-muted-foreground mt-3">
          Creada: {format(new Date(task.createdAt), "d 'de' MMMM, yyyy", { locale: es })}
        </p>
      </CardContent>
      <CardFooter className="pt-3 border-t border-border/50">
        {isTrash ? (
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onRestore?.(task)}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Restaurar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="flex-1"
              onClick={() => onPermanentDelete?.(task)}
            >
              <Trash className="h-4 w-4 mr-2" />
              Eliminar
            </Button>
          </div>
        ) : (
          <div className="flex gap-2 w-full">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1"
              onClick={() => onView(task)}
            >
              <Eye className="h-4 w-4 mr-2" />
              Ver
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1"
              onClick={() => onEdit(task)}
            >
              <Pencil className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(task)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
