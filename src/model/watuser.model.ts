import { dbMeta } from './common.model';

export type WatuserBody = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  location: string;
  email: string;
  password: string;
};

export type Watuser = WatuserBody & dbMeta;
