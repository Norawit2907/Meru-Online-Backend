import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WatDocument = HydratedDocument<WatMongo>;

@Schema({ timestamps: true, collection: 'wat' })
export class WatMongo {
  @Prop({ required: true })
  name: string;

  @Prop({ default: Date.now })
  id: string;

  @Prop({ default: Date.now })
  admin_id: string[];

  @Prop({ default: Date.now })
  min_cost: number;

  @Prop({ default: Date.now })
  max_cost: number;

  @Prop({ default: Date.now })
  description: string;

  @Prop({ default: Date.now })
  location: string;

  @Prop({ default: Date.now })
  picture: string[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const WatSchema = SchemaFactory.createForClass(WatMongo);
