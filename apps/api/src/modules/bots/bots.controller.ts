import { Controller, Get, Param } from '@nestjs/common';
import { BotsService } from './bots.service.js';

@Controller('api/bots')
export class BotsController {
  constructor(private readonly botsService: BotsService) {}

  @Get()
  async getAllBots() {
    return this.botsService.getAllBots();
  }

  @Get(':name')
  async getBot(@Param('name') name: string) {
    return this.botsService.getBot(name);
  }

  @Get(':name/messages')
  async getBotMessages(@Param('name') name: string) {
    return this.botsService.getBotMessages(name);
  }
}
