import { dbMeta } from './common.model';

export type ReservesBody = {
  wat_id: string;
  user_id: string;
  reservation_date: string;
  cremation_date: string;
  duration: string;
  status: string;
  price: number;
  addons: string[];
};

export type Reserves = ReservesBody & dbMeta;