import { useState, useEffect } from 'react';
import type { Task, TaskStatus } from '@/data/mockTasks';
import { statusLabels } from '@/data/mockTasks';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface TaskFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
  onSave: (task: Partial<Task>) => void;
}

export default function TaskFormDialog({
  open,
  onOpenChange,
  task,
  onSave,
}: TaskFormDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('pending');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const isEditing = !!task;

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    } else {
      setTitle('');
      setDescription('');
      setStatus('pending');
    }
    setErrors({});
  }, [task, open]);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!title.trim()) {
      newErrors.title = 'El título es requerido';
    } else if (title.length < 3) {
      newErrors.title = 'Mínimo 3 caracteres';
    }

    if (!description.trim()) {
      newErrors.description = 'La descripción es requerida';
    } else if (description.length < 10) {
      newErrors.description = 'Mínimo 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    onSave({
      id: task?.id,
      title: title.trim(),
      description: description.trim(),
      status,
      createdAt: task?.createdAt || new Date().toISOString().split('T')[0],
    });

    setIsLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Tarea' : 'Nueva Tarea'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Modifica los campos que desees actualizar.'
              : 'Completa los campos para crear una nueva tarea.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Ej: Implementar nueva funcionalidad"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title ? 'border-destructive' : ''}
              disabled={isLoading}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describe la tarea en detalle..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`min-h-[100px] ${errors.description ? 'border-destructive' : ''}`}
              disabled={isLoading}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Estado</Label>
            <Select
              value={status}
              onValueChange={(value: TaskStatus) => setStatus(value)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent>
                {(Object.entries(statusLabels) as [TaskStatus, string][]).map(
                  ([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? 'Guardando...' : 'Creando...'}
                </>
              ) : isEditing ? (
                'Guardar Cambios'
              ) : (
                'Crear Tarea'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
