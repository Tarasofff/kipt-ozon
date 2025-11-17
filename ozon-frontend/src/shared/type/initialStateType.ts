import { PaginatedResponse } from './paginationType';

export interface InitialState {
  loading: boolean;
  error: string | null;
}

export type PaginatedInitialState<T> = InitialState & PaginatedResponse<T>;
