export interface CreatedDiagnoseResponse {
  id: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Diagnose {
  id: number;
  name: string;
}

export interface DiagnosesResponse {
  diagnoses: Diagnose[];
  total: number;
  limit: number;
  offset: number;
}

export interface CreateDiagnose {
  name: string;
}

export interface DiagnosesState {
  diagnoses: Diagnose[];
  total: number;
  offset: number;
  limit: number;
  loading: boolean;
  error: string | null;
}
