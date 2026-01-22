import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class PlayerRelation extends Document {
  @Prop({ required: true })
  playerName: string;

  @Prop({ required: true })
  agent: string;

  @Prop({ required: true })
  relationship: string;
}

export const PlayerRelationSchema = SchemaFactory.createForClass(PlayerRelation);
