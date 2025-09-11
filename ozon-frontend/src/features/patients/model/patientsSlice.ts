import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface PatientsState {
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
    fetchPatientsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPatientsSuccess: (state, action: PayloadAction<Patient[]>) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchPatientsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchPatientsRequest, fetchPatientsSuccess, fetchPatientsFailure } = patientsSlice.actions;
