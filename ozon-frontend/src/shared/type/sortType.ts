import { SORT_ORDER } from '../constants/sort';

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];
