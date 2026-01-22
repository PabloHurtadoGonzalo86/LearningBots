import { Controller, Get, Param, Query } from '@nestjs/common';
import { MemoriesService } from './memories.service.js';

@Controller('api/memories')
export class MemoriesController {
  constructor(private readonly memoriesService: MemoriesService) {}

  @Get('episodic/:agent')
  async getEpisodicMemories(@Param('agent') agent: string, @Query('limit') limit?: string) {
    return this.memoriesService.getEpisodicMemories(agent, limit ? parseInt(limit, 10) : 20);
  }

  @Get('skills/:agent')
  async getSkills(@Param('agent') agent: string, @Query('limit') limit?: string) {
    return this.memoriesService.getSkills(agent, limit ? parseInt(limit, 10) : 20);
  }

  @Get('recipes')
  async getRecipes(@Query('agent') agent?: string) {
    return this.memoriesService.getRecipes(agent);
  }

  @Get('world-facts')
  async getWorldFacts(@Query('agent') agent?: string) {
    return this.memoriesService.getWorldFacts(agent);
  }

  @Get('locations')
  async getLocations(@Query('agent') agent?: string) {
    return this.memoriesService.getLocations(agent);
  }

  @Get('stats')
  async getStats() {
    return this.memoriesService.getStats();
  }
}
