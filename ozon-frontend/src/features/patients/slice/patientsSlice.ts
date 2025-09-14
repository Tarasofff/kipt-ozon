import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPatientsReducer } from '../reducers/fetchPatientsReducer';
import { createPatientReducer } from '../reducers/createPatientReducer';
import { PatientDiagnose } from '@/widgets/save-patient-modal-window/ui/SavePatientModalWindow';

export interface Patient {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  date_of_birth: string;
  email?: string | null;
  is_active: boolean;
}

export interface CreatePatient {
  first_name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  date_of_birth: string;
  email: string | null;
  user_id: number | null;
  diagnose_ids: PatientDiagnose[];
}

export interface PatientsState {
  list: Patient[];
  loading: boolean;
  error: string | null;
}

const initialState: PatientsState = {
  list: [],
  loading: false,
  error: null,
};

export const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    ...fetchPatientsReducer,
    ...createPatientReducer,
  },
});

export const {
  fetchPatientsRequest,
  fetchPatientsSuccess,
  fetchPatientsFailure,
  createPatientFailure,
  createPatientRequest,
  createPatientSuccess,
} = patientsSlice.actions;
