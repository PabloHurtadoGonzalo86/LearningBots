import { Test, TestingModule } from '@nestjs/testing';
import { BotsService } from './bots.service.js';
import { RedisService } from '../../connectors/redis/redis.service.js';

describe('BotsService', () => {
  let service: BotsService;
  let redisService: jest.Mocked<RedisService>;

  beforeEach(async () => {
    const mockRedisService = {
      getAllBotsState: jest.fn(),
      getBotState: jest.fn(),
      getBotMessages: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BotsService,
        { provide: RedisService, useValue: mockRedisService },
      ],
    }).compile();

    service = module.get<BotsService>(BotsService);
    redisService = module.get(RedisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllBots', () => {
    it('should return bots with roles', async () => {
      redisService.getAllBotsState.mockResolvedValue([
        { name: 'Andy', gameState: null, goal: null, attention: null },
      ]);

      const result = await service.getAllBots();

      expect(result).toHaveLength(1);
      expect(result[0].role).toBe('LEADER');
    });
  });

  describe('getBot', () => {
    it('should return a single bot with role', async () => {
      redisService.getBotState.mockResolvedValue({
        name: 'Bruno',
        gameState: { health: 20, food: 20 },
        goal: null,
        attention: null,
      });

      const result = await service.getBot('Bruno');

      expect(result.name).toBe('Bruno');
      expect(result.role).toBe('MINER');
    });
  });
});
