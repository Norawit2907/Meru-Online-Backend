import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AddonDocument = HydratedDocument<AddonMongo>;

@Schema({ timestamps: true, collection: 'addons' })
export class AddonMongo {
  @Prop({ required: true })
  wat_id: string;
  
  @Prop({ default: Date.now })
  id: string; 

  @Prop({ default: Date.now })
  name: string;

  @Prop({ default: Date.now })
  image: string;

  @Prop({ default: Date.now })
  cost: number;

  @Prop({ default: Date.now })
  catalog: string;

  @Prop({ default: Date.now })
  description: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

}

export const AddonSchema = SchemaFactory.createForClass(AddonMongo);
