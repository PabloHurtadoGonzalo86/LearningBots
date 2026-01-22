import { Injectable } from '@nestjs/common';
import { BotsService } from '../bots/bots.service.js';

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

@Injectable()
export class ImprovementsService {
  private improvements: Improvement[] = [];

  constructor(private readonly botsService: BotsService) {}

  getImprovements() {
    return this.improvements;
  }

  async analyzeSystem(): Promise<Improvement[]> {
    const bots = await this.botsService.getAllBots();
    const newImprovements: Improvement[] = [];
    const now = new Date().toISOString();

    for (const bot of bots) {
      if (!bot.gameState) {
        newImprovements.push({
          id: `offline-${bot.name}-${Date.now()}`,
          type: 'error',
          category: 'connectivity',
          title: `Bot offline: ${bot.name}`,
          description: `El bot ${bot.name} no tiene datos de estado. Puede estar desconectado.`,
          affectedBot: bot.name,
          detectedAt: now,
          status: 'pending',
        });
        continue;
      }

      const health = bot.gameState.health;
      if (typeof health === 'number' && health < 5) {
        newImprovements.push({
          id: `low-health-${bot.name}-${Date.now()}`,
          type: 'warning',
          category: 'survival',
          title: `Salud crítica: ${bot.name}`,
          description: `${bot.name} tiene ${health} de salud. Riesgo de muerte.`,
          affectedBot: bot.name,
          detectedAt: now,
          status: 'pending',
        });
      }

      const food = bot.gameState.food;
      if (typeof food === 'number' && food < 5) {
        newImprovements.push({
          id: `low-food-${bot.name}-${Date.now()}`,
          type: 'warning',
          category: 'survival',
          title: `Hambre crítica: ${bot.name}`,
          description: `${bot.name} tiene ${food} de comida. Necesita alimentarse.`,
          affectedBot: bot.name,
          detectedAt: now,
          status: 'pending',
        });
      }

      if (bot.gameState.executing === false && !bot.goal?.goal) {
        newImprovements.push({
          id: `idle-${bot.name}-${Date.now()}`,
          type: 'suggestion',
          category: 'productivity',
          title: `Bot inactivo: ${bot.name}`,
          description: `${bot.name} no tiene ningún objetivo asignado.`,
          affectedBot: bot.name,
          detectedAt: now,
          status: 'pending',
        });
      }
    }

    this.improvements = newImprovements;
    return newImprovements;
  }

  addImprovement(improvement: Omit<Improvement, 'id' | 'detectedAt' | 'status'>) {
    const newImprovement: Improvement = {
      ...improvement,
      id: `${improvement.category}-${Date.now()}`,
      detectedAt: new Date().toISOString(),
      status: 'pending',
    };
    this.improvements.push(newImprovement);
    return newImprovement;
  }

  updateStatus(id: string, status: Improvement['status']) {
    const improvement = this.improvements.find((i) => i.id === id);
    if (improvement) {
      improvement.status = status;
    }
    return improvement;
  }
}
