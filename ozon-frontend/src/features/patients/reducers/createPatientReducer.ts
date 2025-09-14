import { PayloadAction } from '@reduxjs/toolkit';
import { CreatePatient, PatientsState } from '../slice/patientsSlice';
import { CreatedPatientResponse } from '@/shared/api/patients';

export const createPatientReducer = {
  createPatientRequest: (state: PatientsState, action: PayloadAction<CreatePatient>) => {
    state.loading = true;
    state.error = null;
  },
  createPatientSuccess: (state: PatientsState, action: PayloadAction<CreatedPatientResponse>) => {
    state.loading = false;
    state.list.unshift(action.payload);
  },
  createPatientFailure: (state: PatientsState, action: PayloadAction<string>) => {
    state.loading = false;
    state.error = action.payload;
  },
};
