import { cn } from '../../lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max,
  color = 'var(--color-info)',
  label,
  showValue = false,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <figure className={cn('space-y-1', className)} role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
      {(label || showValue) && (
        <figcaption className="flex justify-between text-sm">
          {label && <span className="text-[var(--color-text-secondary)]">{label}</span>}
          {showValue && (
            <data value={value} className="text-[var(--color-text-muted)] tabular-nums">
              {value}/{max}
            </data>
          )}
        </figcaption>
      )}
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </figure>
  );
}
