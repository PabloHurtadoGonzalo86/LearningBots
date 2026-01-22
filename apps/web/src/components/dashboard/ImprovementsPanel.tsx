import type { Improvement } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ScrollArea } from '../ui/ScrollArea';
import { formatDate } from '../../lib/utils';

interface ImprovementsPanelProps {
  improvements: Improvement[];
}

const typeVariants: Record<Improvement['type'], 'error' | 'warning' | 'info'> = {
  error: 'error',
  warning: 'warning',
  suggestion: 'info',
};

const typeLabels: Record<Improvement['type'], string> = {
  error: 'Error',
  warning: 'Advertencia',
  suggestion: 'Sugerencia',
};

export function ImprovementsPanel({ improvements }: ImprovementsPanelProps) {
  const sortedImprovements = [...improvements].sort((a, b) => {
    const priority = { error: 0, warning: 1, suggestion: 2 };
    return priority[a.type] - priority[b.type];
  });

  return (
    <Card as="aside" aria-labelledby="improvements-heading">
      <CardHeader>
        <CardTitle as="h2" className="text-xl flex items-center gap-2" id="improvements-heading">
          Mejoras Continuas
          {improvements.length > 0 && (
            <Badge variant="warning">{improvements.length}</Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {improvements.length === 0 ? (
          <p className="text-[var(--color-text-muted)] text-sm py-4 text-center">
            No hay problemas detectados
          </p>
        ) : (
          <ScrollArea className="h-64">
            <ul className="space-y-3" role="list">
              {sortedImprovements.map((improvement) => (
                <li key={improvement.id} className="p-3 rounded-lg bg-[var(--color-surface-elevated)]">
                  <header className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-medium text-sm">{improvement.title}</h3>
                    <Badge variant={typeVariants[improvement.type]}>{typeLabels[improvement.type]}</Badge>
                  </header>
                  <p className="text-sm text-[var(--color-text-secondary)]">{improvement.description}</p>
                  <footer className="mt-2 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                    {improvement.affectedBot && <span>Bot: {improvement.affectedBot}</span>}
                    <time dateTime={improvement.detectedAt}>{formatDate(improvement.detectedAt)}</time>
                  </footer>
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
