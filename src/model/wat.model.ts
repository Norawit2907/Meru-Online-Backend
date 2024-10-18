import { dbMeta } from './common.model';

export type WatBody = {
    admin_id: string[];
    name: string;
    min_cost: number;
    max_cost: number;
    description: string;
    location: string;
    max_workload: number
    picture: string[];
};

export type Wat = WatBody & dbMeta;
