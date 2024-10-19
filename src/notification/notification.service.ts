import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  NotificationMongo,
  NotificationDocument,
} from 'src/server-adaptor-mongo/notification.schema.mongo';
import mongoose, { Model } from 'mongoose';
import { Notification } from 'src/model/notification.model';

@Injectable()
export class NotificationService {
  constructor(@InjectModel('NotificationMongo') private notificationModel: Model<NotificationMongo>) {}

  async createNotification(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const newNotification = new this.notificationModel(createNotificationDto);
    newNotification.save();
    return this.toEntity(newNotification);
  }

  async getNotificationById(id: string): Promise<Notification | null> {
    const existNotification = await this.notificationModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    
    return existNotification ? this.toEntity(existNotification) : null;
  }

  async listNotification(): Promise<Notification[]> {
    const allNotification = await this.notificationModel.find({});
    return allNotification.map((doc) => this.toEntity(doc));
  }

  async updateNotificationById(
    id: string,
    updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notification | null> {
    const updatedNotification = await this.notificationModel.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(id),
      },
      updateNotificationDto,
      { new: true },
    );

    return updatedNotification ? this.toEntity(updatedNotification) : null;
  }

  async deleteNotificationById(id: string): Promise<null> {
    await this.notificationModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    return null;
  }

  toEntity(doc: NotificationDocument): Notification {
    return {
      id: doc._id.toHexString(),
      title: doc.title,
      description: doc.description,
      owner_id: doc.owner_id,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
  }
}
