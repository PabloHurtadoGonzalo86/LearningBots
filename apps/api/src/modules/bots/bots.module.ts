import { Module } from '@nestjs/common';
import { BotsController } from './bots.controller.js';
import { BotsService } from './bots.service.js';
import { BotsGateway } from './bots.gateway.js';

@Module({
  controllers: [BotsController],
  providers: [BotsService, BotsGateway],
  exports: [BotsService],
})
export class BotsModule {}
