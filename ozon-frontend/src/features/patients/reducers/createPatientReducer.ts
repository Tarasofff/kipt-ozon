import { PayloadAction } from '@reduxjs/toolkit';
import { CreatePatient, Patient, PatientsState } from '../slice/patientsSlice';

export const createPatientReducer = {
  createPatientRequest: (state: PatientsState, action: PayloadAction<CreatePatient>) => {
    state.loading = true;
    state.error = null;
  },
  createPatientSuccess: (state: PatientsState, action: PayloadAction<Patient>) => {
    state.loading = false;
    state.list.push(action.payload);
  },
  createPatientFailure: (state: PatientsState, action: PayloadAction<string>) => {
    state.loading = false;
    state.error = action.payload;
  },
};
