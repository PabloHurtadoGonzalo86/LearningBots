import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Recipe, RecipeSchema } from './schemas/recipe.schema.js';
import { WorldFact, WorldFactSchema } from './schemas/world-fact.schema.js';
import { Location, LocationSchema } from './schemas/location.schema.js';
import { MobBehavior, MobBehaviorSchema } from './schemas/mob-behavior.schema.js';
import { PlayerRelation, PlayerRelationSchema } from './schemas/player-relation.schema.js';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const user = configService.get('MONGO_USER', 'mindcraft');
        const password = configService.get('MONGO_PASSWORD', 'mindcraft_user_2026');
        const host = configService.get('MONGO_HOST', 'localhost');
        const port = configService.get('MONGO_PORT', 27017);
        const database = configService.get('MONGO_DATABASE', 'mindcraft');

        return {
          uri: `mongodb://${user}:${password}@${host}:${port}/${database}?authSource=${database}`,
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Recipe.name, schema: RecipeSchema },
      { name: WorldFact.name, schema: WorldFactSchema },
      { name: Location.name, schema: LocationSchema },
      { name: MobBehavior.name, schema: MobBehaviorSchema },
      { name: PlayerRelation.name, schema: PlayerRelationSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class MongodbModule {}
