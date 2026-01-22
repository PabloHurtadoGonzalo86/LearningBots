import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QdrantService } from '../../connectors/qdrant/qdrant.service.js';
import { Recipe } from '../../connectors/mongodb/schemas/recipe.schema.js';
import { WorldFact } from '../../connectors/mongodb/schemas/world-fact.schema.js';
import { Location } from '../../connectors/mongodb/schemas/location.schema.js';

@Injectable()
export class MemoriesService {
  constructor(
    private readonly qdrantService: QdrantService,
    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
    @InjectModel(WorldFact.name) private worldFactModel: Model<WorldFact>,
    @InjectModel(Location.name) private locationModel: Model<Location>,
  ) {}

  async getEpisodicMemories(agent: string, limit: number) {
    return this.qdrantService.getMemories(agent, limit);
  }

  async getSkills(agent: string, limit: number) {
    return this.qdrantService.getSkills(agent, limit);
  }

  async getRecipes(agent?: string) {
    const filter = agent ? { agent } : {};
    return this.recipeModel.find(filter).sort({ createdAt: -1 }).limit(100).lean();
  }

  async getWorldFacts(agent?: string) {
    const filter = agent ? { agent } : {};
    return this.worldFactModel.find(filter).sort({ createdAt: -1 }).limit(100).lean();
  }

  async getLocations(agent?: string) {
    const filter = agent ? { agent } : {};
    return this.locationModel.find(filter).sort({ createdAt: -1 }).limit(100).lean();
  }

  async getStats() {
    const [memoriesCount, skillsCount, recipesCount, factsCount, locationsCount] = await Promise.all([
      this.qdrantService.getMemoriesCount(),
      this.qdrantService.getSkillsCount(),
      this.recipeModel.countDocuments(),
      this.worldFactModel.countDocuments(),
      this.locationModel.countDocuments(),
    ]);

    return {
      episodicMemories: memoriesCount,
      skills: skillsCount,
      recipes: recipesCount,
      worldFacts: factsCount,
      locations: locationsCount,
    };
  }
}
