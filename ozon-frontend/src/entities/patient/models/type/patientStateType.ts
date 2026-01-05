import { PaginatedInitialState } from '@/shared/type/initialStateType';
import { Patient, PatientEntity } from './patientType';

export type PatientsFilterFields = Record<keyof Omit<Patient, 'notes'>, string>;

export interface PatientsFilterState {
  fields: PatientsFilterFields;
  isOpen: boolean;
}

export interface PatientsState extends PaginatedInitialState<PatientEntity> {
  filter: PatientsFilterState;
}
