import { Controller, Get, Param } from '@nestjs/common';
import { CurriculumService } from './curriculum.service.js';

@Controller('api/curriculum')
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Get()
  async getAllProgress() {
    return this.curriculumService.getAllProgress();
  }

  @Get('tasks')
  async getTechTree() {
    return this.curriculumService.getTechTree();
  }

  @Get(':agent')
  async getAgentProgress(@Param('agent') agent: string) {
    return this.curriculumService.getAgentProgress(agent);
  }
}
