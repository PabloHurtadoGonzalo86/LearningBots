import { Module } from '@nestjs/common';
import { ImprovementsController } from './improvements.controller.js';
import { ImprovementsService } from './improvements.service.js';
import { ImprovementsGateway } from './improvements.gateway.js';
import { BotsModule } from '../bots/bots.module.js';

@Module({
  imports: [BotsModule],
  controllers: [ImprovementsController],
  providers: [ImprovementsService, ImprovementsGateway],
  exports: [ImprovementsService],
})
export class ImprovementsModule {}
