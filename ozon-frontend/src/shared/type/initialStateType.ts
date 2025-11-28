import { PaginatedData } from './paginationType';

export interface InitialState {
  loading: boolean;
  error: string | null;
}

export type PaginatedInitialState<T> = InitialState & PaginatedData<T>;
