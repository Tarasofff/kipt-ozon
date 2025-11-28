import { PaginatedInitialState } from '@/shared/type/initialStateType';
import { PatientEntity } from './patientType';
import { SortOrder } from '@/shared/type/sortType';
export interface PatientsFilterFields {
  last_name: string;
  first_name: string;
  middle_name: string;
  phone: string;
  date_of_birth: string;
  email: string;
  is_active: string;
}

export interface PatientsFilterState {
  fields: PatientsFilterFields;
  isOpen: boolean;
  // sortOrder: SortOrder;
}

export interface PatientsState extends PaginatedInitialState<PatientEntity> {
  filter: PatientsFilterState;
}
