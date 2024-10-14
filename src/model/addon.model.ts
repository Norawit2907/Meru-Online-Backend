import { dbMeta } from './common.model';

export type AddonBody = {
    name: string;
    wat_id: string;
    image: string;
    cost: number;
    catalog: string;
    description: string;
};

export type Addon = AddonBody & dbMeta;
