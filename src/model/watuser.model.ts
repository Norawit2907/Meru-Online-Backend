import { dbMeta } from './common.model';

export type WatuserBody = {
  email: string;
  password: string;
};

export type Watuser = WatuserBody & dbMeta;
