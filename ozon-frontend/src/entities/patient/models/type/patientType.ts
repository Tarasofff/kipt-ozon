import { Timestamp } from '@/shared/type/timestampType';

export interface PatientDiagnose {
  id: number;
  planned_session_count: number;
}

export interface Patient {
  first_name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  date_of_birth: Date | string;
  email: string | null;
  is_active: boolean;
  notes: string | null;
}

export interface PatientEntity extends Patient, Timestamp {
  id: number;
}

export interface CreatePatientRequest extends Patient {
  user_id: number; // id кем был добавлен пациент
  diagnose_ids: PatientDiagnose[];
}
