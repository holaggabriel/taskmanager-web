import React from 'react';
import { type TaskStatus } from '@/domain/tasks/status';
import { Badge } from '@/components/ui/badge';
import { Clock, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: TaskStatus;
  className?: string;
}

const statusConfig: Record<TaskStatus, { label: string; icon: React.ElementType; className: string }> = {
  pending: {
    label: 'Pendiente',
    icon: Clock,
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
  },
  in_progress: {
    label: 'En progreso',
    icon: Loader2,
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  },
  completed: {
    label: 'Completada',
    icon: CheckCircle2,
    className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn('shrink-0 flex items-center gap-1 font-medium', config.className, className)}
    >
      <Icon className={cn('h-3 w-3', status === 'in_progress' && 'animate-spin')} />
      {config.label}
    </Badge>
  );
}
