export interface GameState {
  position: { x: number; y: number; z: number };
  health: number;
  food: number;
  gameTime: number;
  dimension: string;
  isRaining: boolean;
  executing: boolean;
  updatedAt: string;
  completedTasks?: string[];
  failedTasks?: string[];
}

export interface Goal {
  goal: string;
  priority: number;
  setAt: string;
}

export interface Attention {
  target: string;
  type: string;
  focusedAt: string;
}

export interface Bot {
  name: string;
  role: string;
  gameState: GameState | null;
  goal: Goal | null;
  attention: Attention | null;
}

export interface Message {
  sender: string;
  content: string;
  type: string;
  timestamp: string;
}

export interface CurriculumProgress {
  agent: string;
  completed: string[];
  failed: string[];
  current: string | null;
  totalTasks: number;
  completedCount: number;
  progressPercent: number;
}

export interface TechTreePhase {
  name: string;
  tasks: string[];
}

export interface CurriculumData {
  agents: CurriculumProgress[];
  global: {
    completedTasks: number;
    totalTasks: number;
    progressPercent: number;
  };
  techTree: {
    phases: TechTreePhase[];
  };
}

export interface Memory {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  game_time: number;
  location: { x: number; y: number; z: number };
  entities_involved: string[];
  importance_score: number;
  agent_name: string;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  code: string;
  preconditions: string[];
  postconditions: string[];
  category: string;
  complexity: number;
  successCount: number;
}

export interface Recipe {
  _id: string;
  item: string;
  agent: string;
  ingredients: string[];
  craftingTable: boolean;
  furnace: boolean;
  notes: string;
  successCount: number;
  failCount: number;
}

export interface Improvement {
  id: string;
  type: 'warning' | 'error' | 'suggestion';
  category: string;
  title: string;
  description: string;
  affectedBot: string | null;
  detectedAt: string;
  status: 'pending' | 'in_progress' | 'resolved';
}

export interface HealthCheck {
  status: 'healthy' | 'degraded';
  checks: {
    api: string;
    redis: string;
    mongodb: string;
    qdrant: string;
    timestamp: string;
  };
}

export interface MemoryStats {
  episodicMemories: number;
  skills: number;
  recipes: number;
  worldFacts: number;
  locations: number;
}
