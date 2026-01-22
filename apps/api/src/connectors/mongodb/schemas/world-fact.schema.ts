import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class WorldFact extends Document {
  @Prop({ required: true })
  agent: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  fact: string;

  @Prop({ default: 1.0 })
  confidence: number;

  @Prop()
  source: string;
}

export const WorldFactSchema = SchemaFactory.createForClass(WorldFact);
