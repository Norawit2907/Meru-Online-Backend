import { dbMeta } from './common.model';


export type NotificationBody = {
  title: string;
  description: string;
  owner_id: string;
};

export type Notification = NotificationBody & dbMeta;
