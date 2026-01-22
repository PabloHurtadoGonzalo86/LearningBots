import { useEffect, useState } from 'react';
import type { CurriculumData } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { Badge } from '../ui/Badge';
import { ScrollArea } from '../ui/ScrollArea';
import { useApi } from '../../hooks/useApi';

export function CurriculumPanel() {
  const { getCurriculum } = useApi();
  const [data, setData] = useState<CurriculumData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCurriculum();
      if (result) setData(result);
    };
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [getCurriculum]);

  if (!data) {
    return (
      <Card as="section">
        <CardContent>
          <p className="text-[var(--color-text-muted)]">Cargando curriculum...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card as="section" aria-labelledby="curriculum-heading">
      <CardHeader>
        <CardTitle as="h2" className="text-xl" id="curriculum-heading">
          Progreso del Curriculum
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <figure>
          <figcaption className="text-sm text-[var(--color-text-secondary)] mb-2">Progreso Global</figcaption>
          <ProgressBar
            value={data.global.completedTasks}
            max={data.global.totalTasks}
            color="var(--color-success)"
            showValue
          />
          <data value={data.global.progressPercent} className="block text-right text-sm text-[var(--color-text-muted)] mt-1">
            {data.global.progressPercent}%
          </data>
        </figure>

        <ScrollArea className="h-64">
          <table className="w-full text-sm">
            <caption className="sr-only">Progreso por agente</caption>
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th scope="col" className="text-left py-2 font-medium text-[var(--color-text-secondary)]">
                  Agente
                </th>
                <th scope="col" className="text-right py-2 font-medium text-[var(--color-text-secondary)]">
                  Progreso
                </th>
              </tr>
            </thead>
            <tbody>
              {data.agents.map((agent) => (
                <tr key={agent.agent} className="border-b border-[var(--color-border)]/50">
                  <td className="py-2">{agent.agent}</td>
                  <td className="py-2 text-right">
                    <Badge variant={agent.progressPercent > 50 ? 'success' : 'info'}>
                      {agent.completedCount}/{agent.totalTasks}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>

        <details>
          <summary className="cursor-pointer text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
            Ver Tech Tree completo
          </summary>
          <ol className="mt-3 space-y-3">
            {data.techTree.phases.map((phase, index) => (
              <li key={phase.name}>
                <h4 className="font-medium text-sm">
                  {index + 1}. {phase.name}
                </h4>
                <ul className="mt-1 flex flex-wrap gap-1">
                  {phase.tasks.map((task) => (
                    <li key={task}>
                      <Badge variant="default" className="text-xs">
                        {task.replace(/_/g, ' ')}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </details>
      </CardContent>
    </Card>
  );
}
