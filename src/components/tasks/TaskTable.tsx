import { type Task, statusLabels, statusColors } from '@/data/mockTasks';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, Pencil, Trash2, RotateCcw, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface TaskTableProps {
  tasks: Task[];
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onRestore?: (task: Task) => void;
  onPermanentDelete?: (task: Task) => void;
  isTrash?: boolean;
}

export default function TaskTable({
  tasks,
  onView,
  onEdit,
  onDelete,
  onRestore,
  onPermanentDelete,
  isTrash = false,
}: TaskTableProps) {
  return (
    <div className="rounded-lg border border-border/50 overflow-hidden animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Título</TableHead>
            <TableHead className="font-semibold hidden md:table-cell">Descripción</TableHead>
            <TableHead className="font-semibold">Estado</TableHead>
            <TableHead className="font-semibold hidden sm:table-cell">Fecha</TableHead>
            <TableHead className="font-semibold text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} className="group">
              <TableCell className="font-medium max-w-[200px]">
                <span className="line-clamp-1">{task.title}</span>
              </TableCell>
              <TableCell className="hidden md:table-cell max-w-[300px]">
                <span className="text-muted-foreground line-clamp-1">
                  {task.description}
                </span>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`${statusColors[task.status]}`}
                >
                  {statusLabels[task.status]}
                </Badge>
              </TableCell>
              <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                {format(new Date(task.createdAt), "d MMM, yyyy", { locale: es })}
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  {isTrash ? (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onRestore?.(task)}
                        title="Restaurar"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => onPermanentDelete?.(task)}
                        title="Eliminar permanentemente"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onView(task)}
                        title="Ver detalle"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onEdit(task)}
                        title="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => onDelete(task)}
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
