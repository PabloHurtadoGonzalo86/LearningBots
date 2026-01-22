import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QdrantService } from './qdrant.service.js';

@Global()
@Module({
  providers: [
    {
      provide: 'QDRANT_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const { QdrantClient } = await import('@qdrant/js-client-rest');
        return new QdrantClient({
          host: configService.get('QDRANT_HOST', 'localhost'),
          port: configService.get('QDRANT_PORT', 6333),
        });
      },
      inject: [ConfigService],
    },
    QdrantService,
  ],
  exports: ['QDRANT_CLIENT', QdrantService],
})
export class QdrantModule {}
