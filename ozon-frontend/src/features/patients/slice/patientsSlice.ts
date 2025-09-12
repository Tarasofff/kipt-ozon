import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPatientsReducer } from '../reducers/fetchPatientsReducer';
import { createPatientReducer } from '../reducers/createPatientReducer';

export interface Patient {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  date_of_birth: string;
  email?: string | null;
  is_active: boolean;
  planned_session_count: number;
}

export interface CreatePatient {
  first_name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  date_of_birth: string;
  email: string | null;
  doctor_id: number | null;
  diagnose_id: number | null;
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

export const { fetchPatientsRequest, fetchPatientsSuccess, fetchPatientsFailure } = patientsSlice.actions;
