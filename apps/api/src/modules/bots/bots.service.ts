import { Injectable } from '@nestjs/common';
import { RedisService } from '../../connectors/redis/redis.service.js';

const BOT_ROLES: Record<string, string> = {
  Andy: 'LEADER',
  Bruno: 'MINER',
  Carlos: 'LUMBERJACK',
  Diana: 'FARMER',
  Elena: 'BUILDER',
  Felix: 'CRAFTER',
  Gina: 'EXPLORER',
  Hugo: 'GUARD',
  Iris: 'MERCHANT',
  Juan: 'SMITH',
};

@Injectable()
export class BotsService {
  constructor(private readonly redisService: RedisService) {}

  async getAllBots() {
    const states = await this.redisService.getAllBotsState();
    return states.map((state) => ({
      ...state,
      role: BOT_ROLES[state.name] || 'UNKNOWN',
    }));
  }

  async getBot(name: string) {
    const state = await this.redisService.getBotState(name);
    return {
      ...state,
      role: BOT_ROLES[name] || 'UNKNOWN',
    };
  }

  async getBotMessages(name: string) {
    return this.redisService.getBotMessages(name);
  }
}
