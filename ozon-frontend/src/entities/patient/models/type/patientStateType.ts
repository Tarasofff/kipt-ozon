import { PaginatedInitialState } from '@/shared/type/initialStateType';
import { PatientEntity } from './patientType';

export type PatientsState = PaginatedInitialState<PatientEntity>;
