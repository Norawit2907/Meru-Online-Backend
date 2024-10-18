import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WatDocument = HydratedDocument<WatMongo>;

@Schema({ timestamps: true, collection: 'wat' })
export class WatMongo {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  admin_id: string[];

  @Prop({ required: true })
  min_cost: number;

  @Prop({ required: true })
  max_cost: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  location: string;

  @Prop({})
  picture: string[];

  @Prop({ required: true })
  max_workload: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const WatSchema = SchemaFactory.createForClass(WatMongo);
