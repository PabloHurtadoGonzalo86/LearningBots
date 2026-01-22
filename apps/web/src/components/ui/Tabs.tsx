import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../../lib/utils';

export const Tabs = TabsPrimitive.Root;

export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <TabsPrimitive.List className={cn('flex gap-1 border-b border-[var(--color-border)] pb-2', className)}>
      {children}
    </TabsPrimitive.List>
  );
}

export function TabsTrigger({
  children,
  value,
  className,
}: {
  children: React.ReactNode;
  value: string;
  className?: string;
}) {
  return (
    <TabsPrimitive.Trigger
      value={value}
      className={cn(
        'px-3 py-1.5 text-sm font-medium text-[var(--color-text-muted)] rounded-md transition-colors',
        'hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]',
        'data-[state=active]:text-[var(--color-text-primary)] data-[state=active]:bg-[var(--color-surface-elevated)]',
        className
      )}
    >
      {children}
    </TabsPrimitive.Trigger>
  );
}

export function TabsContent({
  children,
  value,
  className,
}: {
  children: React.ReactNode;
  value: string;
  className?: string;
}) {
  return (
    <TabsPrimitive.Content value={value} className={cn('mt-4', className)}>
      {children}
    </TabsPrimitive.Content>
  );
}
