import { Injectable, Inject } from '@nestjs/common';
import type { Redis } from 'ioredis';
import type { QdrantClient } from '@qdrant/js-client-rest';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class HealthService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    @Inject('QDRANT_CLIENT') private readonly qdrant: QdrantClient,
    @InjectConnection() private readonly mongoConnection: Connection,
  ) {}

  async check() {
    const checks = {
      api: 'healthy',
      redis: 'unknown',
      mongodb: 'unknown',
      qdrant: 'unknown',
      timestamp: new Date().toISOString(),
    };

    try {
      await this.redis.ping();
      checks.redis = 'healthy';
    } catch {
      checks.redis = 'unhealthy';
    }

    try {
      if (this.mongoConnection.readyState === 1) {
        checks.mongodb = 'healthy';
      } else {
        checks.mongodb = 'unhealthy';
      }
    } catch {
      checks.mongodb = 'unhealthy';
    }

    try {
      await this.qdrant.getCollections();
      checks.qdrant = 'healthy';
    } catch {
      checks.qdrant = 'unhealthy';
    }

    const isHealthy = checks.api === 'healthy' && checks.redis === 'healthy' && checks.mongodb === 'healthy' && checks.qdrant === 'healthy';

    return {
      status: isHealthy ? 'healthy' : 'degraded',
      checks,
    };
  }
}
