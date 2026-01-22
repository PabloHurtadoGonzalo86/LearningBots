import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './connectors/redis/redis.module.js';
import { MongodbModule } from './connectors/mongodb/mongodb.module.js';
import { QdrantModule } from './connectors/qdrant/qdrant.module.js';
import { BotsModule } from './modules/bots/bots.module.js';
import { MemoriesModule } from './modules/memories/memories.module.js';
import { CurriculumModule } from './modules/curriculum/curriculum.module.js';
import { HealthModule } from './modules/health/health.module.js';
import { ImprovementsModule } from './modules/improvements/improvements.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule,
    MongodbModule,
    QdrantModule,
    BotsModule,
    MemoriesModule,
    CurriculumModule,
    HealthModule,
    ImprovementsModule,
  ],
})
export class AppModule {}
