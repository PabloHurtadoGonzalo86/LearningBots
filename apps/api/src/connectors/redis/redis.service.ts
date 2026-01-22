import { Injectable, Inject, OnModuleDestroy } from '@nestjs/common';
import type { Redis } from 'ioredis';

const BOT_NAMES = ['Andy', 'Bruno', 'Carlos', 'Diana', 'Elena', 'Felix', 'Gina', 'Hugo', 'Iris', 'Juan'];

@Injectable()
export class RedisService implements OnModuleDestroy {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  async onModuleDestroy() {
    await this.redis.quit();
  }

  async getBotState(botName: string) {
    const [gameState, goal, attention] = await Promise.all([
      this.redis.get(`mindcraft:${botName}:gameState`),
      this.redis.get(`mindcraft:${botName}:goal:current`),
      this.redis.get(`mindcraft:${botName}:attention`),
    ]);

    return {
      name: botName,
      gameState: gameState ? JSON.parse(gameState) : null,
      goal: goal ? JSON.parse(goal) : null,
      attention: attention ? JSON.parse(attention) : null,
    };
  }

  async getAllBotsState() {
    const states = await Promise.all(BOT_NAMES.map((name) => this.getBotState(name)));
    return states;
  }

  async getBotMessages(botName: string, limit = 50) {
    const messages = await this.redis.lrange(`mindcraft:${botName}:messages`, 0, limit - 1);
    return messages.map((m) => JSON.parse(m));
  }

  async getVillageBots() {
    const bots = await this.redis.hgetall('village:bots');
    return Object.entries(bots).map(([name, data]) => ({
      name,
      ...JSON.parse(data),
    }));
  }

  async getPlayerInteraction(botName: string, playerName: string) {
    const data = await this.redis.get(`mindcraft:${botName}:player:${playerName}`);
    return data ? JSON.parse(data) : null;
  }

  async getCurriculumProgress(botName: string) {
    const data = await this.redis.get(`mindcraft:${botName}:curriculum`);
    return data ? JSON.parse(data) : null;
  }

  subscribe(callback: (channel: string, message: string) => void) {
    const subscriber = this.redis.duplicate();
    subscriber.psubscribe('mindcraft:*');
    subscriber.on('pmessage', (_pattern, channel, message) => {
      callback(channel, message);
    });
    return subscriber;
  }
}
