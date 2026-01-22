import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Recipe extends Document {
  @Prop({ required: true })
  item: string;

  @Prop({ required: true })
  agent: string;

  @Prop({ type: [String], default: [] })
  ingredients: string[];

  @Prop({ default: false })
  craftingTable: boolean;

  @Prop({ default: false })
  furnace: boolean;

  @Prop()
  notes: string;

  @Prop({ default: 0 })
  successCount: number;

  @Prop({ default: 0 })
  failCount: number;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
