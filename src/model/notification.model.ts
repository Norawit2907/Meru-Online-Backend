import { NotificationStatus } from 'src/server-adaptor-mongo/notification.schema.mongo';
import { dbMeta } from './common.model';


export type NotificationBody = {
  title: string;
  description: string;
  status: NotificationStatus;
};

export type Notification = NotificationBody & dbMeta;
