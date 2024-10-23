import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AddressDocument = HydratedDocument<AddressMongo>;

@Schema({ timestamps: true, collection: 'Addresses' })
export class AddressMongo {
  @Prop({ required: true })
  wat_id: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  alley: string;

  @Prop({ required: true })
  province: string;

  @Prop({ required: true })
  distrinct: string;

  @Prop({ required: true })
  sub_distrinct: string;

  @Prop({ required: true })
  postalCode: string;

  @Prop({ required: true })
  latitude: string;

  @Prop({ required: true })
  longtitude: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const AddressSchema = SchemaFactory.createForClass(AddressMongo);
