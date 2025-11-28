import { PaginatedInitialState } from '@/shared/type/initialStateType';
import { DoctorEntity } from './doctorType';

export type DoctorsState = PaginatedInitialState<DoctorEntity>;
