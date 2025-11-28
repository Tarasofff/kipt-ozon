import { DiagnoseEntity } from '@/entities/diagnose/models/type/diagnoseType';
import { DoctorEntity } from '@/entities/doctor/models/type/doctorType';
import { UserEntity } from '@/entities/user/model/type/userType';
import { PaginationParams } from '@/shared/type/paginationType';
import { Timestamp } from '@/shared/type/timestampType';

export interface AddressEntity extends Timestamp {
  id: number;
  city_name: string;
  street_name: string;
  postal_code: string;
  building_number: string;
  country_name: string;
}

export interface HospitalEntity extends Timestamp {
  id: number;
  name: string;
  number: number;
  address: AddressEntity;
}

export interface CabinetEntity extends Timestamp {
  id: number;
  number: string;
  hospital: HospitalEntity;
}

export interface PostEntity extends Timestamp {
  id: number;
  number: number;
  cabinet: CabinetEntity;
}

export interface NurseEntity extends Timestamp {
  id: number;
  user: UserEntity;
}

export interface PatientSessionEntity extends Timestamp {
  id: number;
  notes: string | null;
  is_active: boolean;
  session_duration_ms: number;
  ozone_concentration: number;
  post: PostEntity;
  nurse: NurseEntity;
}

export interface Patient {
  first_name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  date_of_birth: string;
  email: string | null;
  is_active: boolean;
  notes: string | null;
}

export interface PatientsFilterQuery extends Partial<Omit<Patient, 'notes' | 'is_active'>>, PaginationParams {
  is_active?: string;
}

export interface PatientDoctorDiagnoseEntity extends Timestamp {
  id: number;
  diagnose: DiagnoseEntity;
  session: PatientSessionEntity[];
  doctor: DoctorEntity;
  planned_session_count: number;
}

export interface PatientEntity extends Patient, Timestamp {
  id: number;
  patient_doctor_diagnose?: PatientDoctorDiagnoseEntity[];
}

export interface PatientDiagnoseEntity extends Timestamp {
  id: number;
  planned_session_count: number;
}

export interface CreatePatientRequest extends Patient {
  user_id: number; // id кем был добавлен пациент
  diagnose_ids: PatientDiagnoseEntity[];
}
