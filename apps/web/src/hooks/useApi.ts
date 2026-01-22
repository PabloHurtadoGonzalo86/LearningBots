import { useState, useCallback } from 'react';
import type { CurriculumData, HealthCheck, MemoryStats, Recipe, Memory, Skill } from '../types';

const API_BASE = '/api';

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return response.json();
}

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(async <T>(fetcher: () => Promise<T>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetcher();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getCurriculum = useCallback(() => {
    return request(() => fetchJson<CurriculumData>(`${API_BASE}/curriculum`));
  }, [request]);

  const getHealth = useCallback(() => {
    return request(() => fetchJson<HealthCheck>(`${API_BASE}/health`));
  }, [request]);

  const getMemoryStats = useCallback(() => {
    return request(() => fetchJson<MemoryStats>(`${API_BASE}/memories/stats`));
  }, [request]);

  const getRecipes = useCallback((agent?: string) => {
    const url = agent ? `${API_BASE}/memories/recipes?agent=${agent}` : `${API_BASE}/memories/recipes`;
    return request(() => fetchJson<Recipe[]>(url));
  }, [request]);

  const getEpisodicMemories = useCallback((agent: string, limit = 20) => {
    return request(() => fetchJson<Memory[]>(`${API_BASE}/memories/episodic/${agent}?limit=${limit}`));
  }, [request]);

  const getSkills = useCallback((agent: string, limit = 20) => {
    return request(() => fetchJson<Skill[]>(`${API_BASE}/memories/skills/${agent}?limit=${limit}`));
  }, [request]);

  return {
    loading,
    error,
    getCurriculum,
    getHealth,
    getMemoryStats,
    getRecipes,
    getEpisodicMemories,
    getSkills,
  };
}
