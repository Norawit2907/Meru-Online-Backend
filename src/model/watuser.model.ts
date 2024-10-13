import { dbMeta } from './common.model';

export type WatuserBody = {
  username: string;
  password: string;
};

export type Watuser = WatuserBody & dbMeta;
