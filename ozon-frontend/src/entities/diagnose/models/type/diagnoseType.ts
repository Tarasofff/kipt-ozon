import { Timestamp } from '@/shared/type/timestampType';

export interface Diagnose {
  name: string;
}

export interface DiagnoseEntity extends Diagnose, Timestamp {
  id: number;
}
