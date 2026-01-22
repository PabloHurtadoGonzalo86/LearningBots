import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '../../lib/utils';

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <TooltipPrimitive.Provider delayDuration={300}>{children}</TooltipPrimitive.Provider>;
}

export function Tooltip({
  children,
  content,
  className,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side="top"
          sideOffset={4}
          className={cn(
            'z-50 rounded-md bg-[var(--color-surface-elevated)] px-3 py-1.5 text-sm',
            'border border-[var(--color-border)] shadow-lg',
            'animate-in fade-in-0 zoom-in-95',
            className
          )}
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-[var(--color-surface-elevated)]" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
