import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AddressDocument = HydratedDocument<AddressMongo>;

@Schema({ timestamps: true, collection: 'Addresses' })
export class AddressMongo {
  @Prop({ required: true })
  wat_id: string;

  @Prop({ default: Date.now })
  address: string;

  @Prop({ default: Date.now })
  street: string;

  @Prop({ default: Date.now })
  alley: string;

  @Prop({ default: Date.now })
  province: string;

  @Prop({ default: Date.now })
  disctrinct: string;

  @Prop({ default: Date.now })
  sub_disctrinct: string;

  @Prop({ default: Date.now })
  postalCode: string;

  @Prop({ default: Date.now })
  latitude: string;

  @Prop({ default: Date.now })
  longtitude: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const AddressSchema = SchemaFactory.createForClass(AddressMongo);
