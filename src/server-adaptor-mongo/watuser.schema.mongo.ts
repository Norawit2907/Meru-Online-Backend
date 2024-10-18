import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WatuserDocument = HydratedDocument<WatuserMongo>;

@Schema({ timestamps: true, collection: 'watuser' })
export class WatuserMongo {

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const WatuserSchema = SchemaFactory.createForClass(WatuserMongo);
