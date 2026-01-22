import { Injectable } from '@nestjs/common';
import { RedisService } from '../../connectors/redis/redis.service.js';

const TECH_TREE = {
  phases: [
    {
      name: 'Supervivencia Básica',
      tasks: ['get_wood', 'craft_planks', 'craft_crafting_table', 'craft_sticks', 'craft_wooden_pickaxe'],
    },
    {
      name: 'Herramientas Piedra',
      tasks: ['get_cobblestone', 'craft_stone_pickaxe', 'craft_stone_sword', 'craft_stone_axe', 'craft_furnace'],
    },
    {
      name: 'Recursos Avanzados',
      tasks: ['get_coal', 'craft_torches', 'get_iron_ore', 'smelt_iron'],
    },
    {
      name: 'Herramientas Hierro',
      tasks: ['craft_iron_pickaxe', 'craft_iron_sword', 'craft_iron_armor', 'craft_shield', 'craft_bucket'],
    },
    {
      name: 'Diamantes',
      tasks: ['get_diamonds', 'craft_diamond_pickaxe', 'craft_diamond_sword'],
    },
    {
      name: 'Nether',
      tasks: ['get_obsidian', 'craft_flint_and_steel', 'build_nether_portal'],
    },
    {
      name: 'Exploración Nether',
      tasks: ['enter_nether', 'get_blaze_rods', 'get_ender_pearls', 'craft_eyes_of_ender'],
    },
    {
      name: 'End Game',
      tasks: ['find_stronghold', 'activate_end_portal', 'defeat_ender_dragon'],
    },
  ],
};

const TOTAL_TASKS = TECH_TREE.phases.reduce((sum, phase) => sum + phase.tasks.length, 0);

const BOT_NAMES = ['Andy', 'Bruno', 'Carlos', 'Diana', 'Elena', 'Felix', 'Gina', 'Hugo', 'Iris', 'Juan'];

export interface AgentProgress {
  agent: string;
  completed: string[];
  failed: string[];
  current: string | null;
  totalTasks: number;
  completedCount: number;
  progressPercent: number;
}

@Injectable()
export class CurriculumService {
  constructor(private readonly redisService: RedisService) {}

  getTechTree() {
    return {
      ...TECH_TREE,
      totalTasks: TOTAL_TASKS,
    };
  }

  async getAgentProgress(agent: string): Promise<AgentProgress> {
    const [state, curriculum] = await Promise.all([
      this.redisService.getBotState(agent),
      this.redisService.getCurriculumProgress(agent),
    ]);

    // Use curriculum data from Redis if available, fallback to gameState
    const completed = curriculum?.completedTasks || state.gameState?.completedTasks || [];
    const failed = curriculum?.failedTasks || state.gameState?.failedTasks || [];
    const current = curriculum?.currentTask || state.goal?.goal || null;

    return {
      agent,
      completed,
      failed,
      current,
      totalTasks: TOTAL_TASKS,
      completedCount: completed.length,
      progressPercent: Math.round((completed.length / TOTAL_TASKS) * 100),
    };
  }

  async getAllProgress() {
    const progress = await Promise.all(BOT_NAMES.map((name) => this.getAgentProgress(name)));

    const globalCompleted = progress.reduce((sum, p) => sum + p.completedCount, 0);
    const globalTotal = BOT_NAMES.length * TOTAL_TASKS;

    return {
      agents: progress,
      global: {
        completedTasks: globalCompleted,
        totalTasks: globalTotal,
        progressPercent: Math.round((globalCompleted / globalTotal) * 100),
      },
      techTree: TECH_TREE,
    };
  }
}
