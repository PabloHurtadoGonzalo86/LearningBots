import { useEffect, useState } from 'react';
import type { MemoryStats, Recipe, Memory, Skill } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import { ScrollArea } from '../ui/ScrollArea';
import { Badge } from '../ui/Badge';
import { useApi } from '../../hooks/useApi';

const BOTS = ['Andy', 'Bruno', 'Carlos', 'Diana', 'Elena', 'Felix', 'Gina', 'Hugo', 'Iris', 'Juan'];

export function MemoriesPanel() {
  const { getMemoryStats, getRecipes, getEpisodicMemories, getSkills } = useApi();
  const [stats, setStats] = useState<MemoryStats | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedBot, setSelectedBot] = useState<string>(BOTS[0]);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [statsResult, recipesResult] = await Promise.all([getMemoryStats(), getRecipes()]);
      if (statsResult) setStats(statsResult);
      if (recipesResult) setRecipes(recipesResult);
    };
    fetchData();
  }, [getMemoryStats, getRecipes]);

  useEffect(() => {
    const fetchBotData = async () => {
      const [memoriesResult, skillsResult] = await Promise.all([
        getEpisodicMemories(selectedBot, 20),
        getSkills(selectedBot, 20),
      ]);
      if (memoriesResult) setMemories(memoriesResult);
      if (skillsResult) setSkills(skillsResult);
    };
    fetchBotData();
  }, [selectedBot, getEpisodicMemories, getSkills]);

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
            <div className="mb-3">
              <label htmlFor="bot-select-episodic" className="sr-only">Seleccionar bot</label>
              <select
                id="bot-select-episodic"
                value={selectedBot}
                onChange={(e) => setSelectedBot(e.target.value)}
                className="w-full p-2 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-sm"
              >
                {BOTS.map((bot) => (
                  <option key={bot} value={bot}>{bot}</option>
                ))}
              </select>
            </div>
            <ScrollArea className="h-48">
              {memories.length === 0 ? (
                <p className="text-[var(--color-text-muted)] text-sm py-4 text-center">
                  Sin memorias para {selectedBot}
                </p>
              ) : (
                <ul className="space-y-2" role="list">
                  {memories.map((memory) => (
                    <li key={memory.id} className="p-2 rounded bg-[var(--color-surface-elevated)]">
                      <p className="text-sm">{memory.description}</p>
                      <footer className="flex items-center justify-between mt-1">
                        <Badge variant="info">{memory.type}</Badge>
                        <time className="text-xs text-[var(--color-text-muted)]">
                          {new Date(memory.timestamp).toLocaleString('es-ES')}
                        </time>
                      </footer>
                    </li>
                  ))}
                </ul>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="skills">
            <div className="mb-3">
              <label htmlFor="bot-select-skills" className="sr-only">Seleccionar bot</label>
              <select
                id="bot-select-skills"
                value={selectedBot}
                onChange={(e) => setSelectedBot(e.target.value)}
                className="w-full p-2 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-sm"
              >
                {BOTS.map((bot) => (
                  <option key={bot} value={bot}>{bot}</option>
                ))}
              </select>
            </div>
            <ScrollArea className="h-48">
              {skills.length === 0 ? (
                <p className="text-[var(--color-text-muted)] text-sm py-4 text-center">
                  Sin habilidades para {selectedBot}
                </p>
              ) : (
                <ul className="space-y-2" role="list">
                  {skills.map((skill) => (
                    <li key={skill.id} className="p-2 rounded bg-[var(--color-surface-elevated)]">
                      <header className="flex items-center justify-between">
                        <strong className="text-sm">{skill.name}</strong>
                        <Badge variant="success">{skill.category}</Badge>
                      </header>
                      <p className="text-xs text-[var(--color-text-muted)] mt-1">{skill.description}</p>
                    </li>
                  ))}
                </ul>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
