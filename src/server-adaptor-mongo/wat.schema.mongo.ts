import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WatDocument = HydratedDocument<WatMongo>;

@Schema({ timestamps: true, collection: 'wat' })
export class WatMongo {
  @Prop({ required: true})
  name: string;

  @Prop({ required: true })
  admin_id: string;

  @Prop({ required: true })
  admin_name: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  line_ID: string;

  @Prop({ required: true })
  Facebook: string;

  @Prop({ required: true, default: 0 })
  min_cost: number;

  @Prop({ required: true, default: 0 })
  max_cost: number;

  @Prop({ required: true, default: "cool wat description" })
  description: string;

  @Prop({ required: true, default: "to the moon!!"})
  location: string;

  @Prop({})
  picture: string[];

  @Prop({ required: true, default: 0 })
  max_workload: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const WatSchema = SchemaFactory.createForClass(WatMongo);
