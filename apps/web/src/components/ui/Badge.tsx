import { cn } from '../../lib/utils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)]',
  success: 'bg-[var(--color-success)]/20 text-[var(--color-success)]',
  warning: 'bg-[var(--color-warning)]/20 text-[var(--color-warning)]',
  error: 'bg-[var(--color-error)]/20 text-[var(--color-error)]',
  info: 'bg-[var(--color-info)]/20 text-[var(--color-info)]',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <mark className={cn('inline-flex items-center rounded px-2 py-0.5 text-xs font-medium', variantStyles[variant], className)}>
      {children}
    </mark>
  );
}
