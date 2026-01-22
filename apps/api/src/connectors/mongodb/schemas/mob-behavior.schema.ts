import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class MobBehavior extends Document {
  @Prop({ required: true })
  mobType: string;

  @Prop({ required: true })
  agent: string;

  @Prop({ required: true })
  behavior: string;
}

export const MobBehaviorSchema = SchemaFactory.createForClass(MobBehavior);
