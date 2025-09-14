import { PayloadAction } from '@reduxjs/toolkit';
import { Patient, PatientsState } from '../slice/patientsSlice';

export const fetchPatientsReducer = {
  fetchPatientsRequest: (state: PatientsState) => {
    state.loading = true;
    state.error = null;
  },
  fetchPatientsSuccess: (state: PatientsState, action: PayloadAction<Patient[]>) => {
    state.loading = false;
    state.list = action.payload;
  },
  fetchPatientsFailure: (state: PatientsState, action: PayloadAction<string>) => {
    state.loading = false;
    state.error = action.payload;
  },
};
