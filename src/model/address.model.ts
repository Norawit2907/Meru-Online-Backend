import { dbMeta } from './common.model';

export type AddressBody = {
    wat_id: string;
    address: string;
    street: string;
    alley: string;
    province: string;
    disctrinct: string;
    sub_disctrinct: string;
    postalCode: string;
    latitude: string;
    longtitude: string;
};

export type Address = AddressBody & dbMeta;
