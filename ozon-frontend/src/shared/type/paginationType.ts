export interface Pagination {
  limit: number;
  offset: number;
}

export interface PaginatedResponse<T> extends Pagination {
  data: T[];
  total: number;
}
