import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from '../../connectors/mongodb/schemas/recipe.schema.js';
import { WorldFact, WorldFactSchema } from '../../connectors/mongodb/schemas/world-fact.schema.js';
import { Location, LocationSchema } from '../../connectors/mongodb/schemas/location.schema.js';
import { MemoriesController } from './memories.controller.js';
import { MemoriesService } from './memories.service.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Recipe.name, schema: RecipeSchema },
      { name: WorldFact.name, schema: WorldFactSchema },
      { name: Location.name, schema: LocationSchema },
    ]),
  ],
  controllers: [MemoriesController],
  providers: [MemoriesService],
  exports: [MemoriesService],
})
export class MemoriesModule {}
