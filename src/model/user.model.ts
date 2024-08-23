import { dbMeta } from './common.model';

export type UserBody = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  location: string;
  email: string;
  password: string;
};

export type User = UserBody & dbMeta;
