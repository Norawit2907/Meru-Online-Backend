import { SortOrder } from 'mongoose';

export type dbMeta = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type PaginateOptions = {
  limit: number;
  page: number;
};

export type queryOptions = Partial<{
  sortQuery: SortOrder;
}>;

export type Paginated<T> = {
  total: number;
  from: number;
  to: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
  data: T[];
};
