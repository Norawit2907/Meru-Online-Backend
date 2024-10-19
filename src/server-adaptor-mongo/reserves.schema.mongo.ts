import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReservesDocument = HydratedDocument<ReservesMongo>;

@Schema({ timestamps: true, collection: 'reserves' })
export class ReservesMongo {
  @Prop({ default: Date.now })
  wat_id: string; 

  @Prop({ default: Date.now })
  user_id: string;

  @Prop({ default: Date.now })
  reservation_date: string;

  @Prop({ default: Date.now })
  cremation_date: string;

  @Prop({ default: Date.now })
  duration: string;

  @Prop({ default: Date.now })
  status: string;

  @Prop({ default: Date.now })
  price: number;

  @Prop({ default: Date.now })
  addons: string[];

}

export const ReservesSchema = SchemaFactory.createForClass(ReservesMongo);
