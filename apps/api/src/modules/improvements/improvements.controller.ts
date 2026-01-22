import { Controller, Get } from '@nestjs/common';
import { ImprovementsService } from './improvements.service.js';

@Controller('api/improvements')
export class ImprovementsController {
  constructor(private readonly improvementsService: ImprovementsService) {}

  @Get()
  async getImprovements() {
    return this.improvementsService.getImprovements();
  }

  @Get('analyze')
  async analyzeSystem() {
    return this.improvementsService.analyzeSystem();
  }
}
