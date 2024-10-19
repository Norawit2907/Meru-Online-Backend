import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NotificationDocument = HydratedDocument<NotificationMongo>;

export enum NotificationStatus {
  PENDING = "รอยืนยัน",
  ACCEPT = "กำลังมาถึง",
  PASSED = "ผ่านมาแล้ว",
  REJECTED = "ปฏิเสธแล้ว",
}

@Schema({ timestamps: true, collection: 'notification' })
export class NotificationMongo {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: NotificationStatus.PENDING })
  status: NotificationStatus;
  
  @Prop({ required: true })
  sender: string;

  @Prop({ required: true })
  received: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(NotificationMongo);
