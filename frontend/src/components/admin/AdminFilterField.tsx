'use client';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface AdminFilterFieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
  labelClassName?: string;
  controlClassName?: string;
}

export function AdminFilterField({
  label,
  children,
  className,
  labelClassName,
  controlClassName,
}: AdminFilterFieldProps) {
  return (
    <div
      className={cn(
        'admin-filter-field flex min-w-0 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-2',
        className,
      )}
    >
      <Label
        className={cn(
          'shrink-0 text-sm text-slate-600 sm:whitespace-nowrap',
          labelClassName,
        )}
      >
        {label}
      </Label>
      <div className={cn('w-full min-w-0 sm:w-auto sm:min-w-[8.75rem] sm:shrink-0', controlClassName)}>
        {children}
      </div>
    </div>
  );
}
