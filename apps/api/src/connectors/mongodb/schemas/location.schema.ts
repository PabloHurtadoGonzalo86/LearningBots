import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Location extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  agent: string;

  @Prop({ type: Object, required: true })
  coordinates: {
    x: number;
    y: number;
    z: number;
  };
}

export const LocationSchema = SchemaFactory.createForClass(Location);
