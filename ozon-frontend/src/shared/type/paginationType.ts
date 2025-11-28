export interface PaginationParams {
  limit: number;
  offset: number;
}

export interface PaginatedData<T> extends PaginationParams {
  data: T[];
  total: number;
}
