import { useEffect, useState } from 'react';
import type { HealthCheck } from '../../types';
import { Badge } from '../ui/Badge';
import { Tooltip, TooltipProvider } from '../ui/Tooltip';
import { useApi } from '../../hooks/useApi';
import { getStatusColor } from '../../lib/utils';

export function HealthStatus() {
  const { getHealth } = useApi();
  const [health, setHealth] = useState<HealthCheck | null>(null);

  useEffect(() => {
    const fetchHealth = async () => {
      const result = await getHealth();
      if (result) setHealth(result);
    };
    fetchHealth();
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, [getHealth]);

  if (!health) return null;

  const services = [
    { name: 'API', status: health.checks.api },
    { name: 'Redis', status: health.checks.redis },
    { name: 'MongoDB', status: health.checks.mongodb },
    { name: 'Qdrant', status: health.checks.qdrant },
  ];

  return (
    <TooltipProvider>
      <aside aria-label="Estado de los servicios" className="flex items-center gap-2">
        {services.map((service) => (
          <Tooltip key={service.name} content={`${service.name}: ${service.status}`}>
            <button type="button" className="flex items-center gap-1.5 px-2 py-1 rounded bg-[var(--color-surface)]">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: getStatusColor(service.status) }}
                aria-hidden="true"
              />
              <span className="text-xs text-[var(--color-text-secondary)]">{service.name}</span>
            </button>
          </Tooltip>
        ))}
        <Badge variant={health.status === 'healthy' ? 'success' : 'warning'}>
          {health.status === 'healthy' ? 'Saludable' : 'Degradado'}
        </Badge>
      </aside>
    </TooltipProvider>
  );
}
