import { dbMeta } from './common.model';

export type WatBody = {
    name: string;
    admin_id: string;
    admin_name: string;
    phoneNumber: string;
    line_ID: string;
    Facebook: string;
    min_cost: number;
    max_cost: number;
    description: string;
    location: string;
    max_workload: number
    picture: string[];
};

export type Wat = WatBody & dbMeta;
