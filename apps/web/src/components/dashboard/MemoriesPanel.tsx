import { useEffect, useState } from 'react';
import type { MemoryStats, Recipe } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import { ScrollArea } from '../ui/ScrollArea';
import { Badge } from '../ui/Badge';
import { useApi } from '../../hooks/useApi';

export function MemoriesPanel() {
  const { getMemoryStats, getRecipes } = useApi();
  const [stats, setStats] = useState<MemoryStats | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [statsResult, recipesResult] = await Promise.all([getMemoryStats(), getRecipes()]);
      if (statsResult) setStats(statsResult);
      if (recipesResult) setRecipes(recipesResult);
    };
    fetchData();
  }, [getMemoryStats, getRecipes]);

  return (
    <Card as="section" aria-labelledby="memories-heading">
      <CardHeader>
        <CardTitle as="h2" className="text-xl" id="memories-heading">
          Sistema de Memorias
        </CardTitle>
      </CardHeader>

      <CardContent>
        {stats && (
          <dl className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="text-center p-3 rounded bg-[var(--color-surface-elevated)]">
              <dt className="text-xs text-[var(--color-text-muted)]">Episódicas</dt>
              <dd className="text-2xl font-bold tabular-nums">{stats.episodicMemories.toLocaleString()}</dd>
            </div>
            <div className="text-center p-3 rounded bg-[var(--color-surface-elevated)]">
              <dt className="text-xs text-[var(--color-text-muted)]">Habilidades</dt>
              <dd className="text-2xl font-bold tabular-nums">{stats.skills.toLocaleString()}</dd>
            </div>
            <div className="text-center p-3 rounded bg-[var(--color-surface-elevated)]">
              <dt className="text-xs text-[var(--color-text-muted)]">Recetas</dt>
              <dd className="text-2xl font-bold tabular-nums">{stats.recipes.toLocaleString()}</dd>
            </div>
            <div className="text-center p-3 rounded bg-[var(--color-surface-elevated)]">
              <dt className="text-xs text-[var(--color-text-muted)]">Hechos</dt>
              <dd className="text-2xl font-bold tabular-nums">{stats.worldFacts.toLocaleString()}</dd>
            </div>
            <div className="text-center p-3 rounded bg-[var(--color-surface-elevated)]">
              <dt className="text-xs text-[var(--color-text-muted)]">Ubicaciones</dt>
              <dd className="text-2xl font-bold tabular-nums">{stats.locations.toLocaleString()}</dd>
            </div>
          </dl>
        )}

        <Tabs defaultValue="recipes">
          <TabsList>
            <TabsTrigger value="recipes">Recetas</TabsTrigger>
            <TabsTrigger value="episodic">Episódicas</TabsTrigger>
            <TabsTrigger value="skills">Habilidades</TabsTrigger>
          </TabsList>

          <TabsContent value="recipes">
            <ScrollArea className="h-48">
              {recipes.length === 0 ? (
                <p className="text-[var(--color-text-muted)] text-sm py-4 text-center">Sin recetas</p>
              ) : (
                <ul className="space-y-2" role="list">
                  {recipes.slice(0, 20).map((recipe) => (
                    <li key={recipe._id} className="p-2 rounded bg-[var(--color-surface-elevated)]">
                      <header className="flex items-center justify-between">
                        <strong className="text-sm">{recipe.item}</strong>
                        <Badge variant="default">{recipe.agent}</Badge>
                      </header>
                      <p className="text-xs text-[var(--color-text-muted)] mt-1">
                        {recipe.ingredients.join(', ')}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="episodic">
            <p className="text-[var(--color-text-muted)] text-sm py-4 text-center">
              Selecciona un bot para ver sus memorias episódicas
            </p>
          </TabsContent>

          <TabsContent value="skills">
            <p className="text-[var(--color-text-muted)] text-sm py-4 text-center">
              Selecciona un bot para ver sus habilidades aprendidas
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
