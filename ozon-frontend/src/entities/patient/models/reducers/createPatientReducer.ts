import { PayloadAction } from '@reduxjs/toolkit';
import { CreatePatientRequest, PatientEntity } from '../type/patientType';
import { PatientsState } from '../type/patientStateType';

export const createPatientReducer = {
  createPatientRequest: (state: PatientsState, action: PayloadAction<CreatePatientRequest>) => {
    state.loading = true;
    state.error = null;
  },
  createPatientSuccess: (state: PatientsState, action: PayloadAction<PatientEntity>) => {
    state.loading = false;
    state.data.unshift(action.payload);
  },
  createPatientFailure: (state: PatientsState, action: PayloadAction<string>) => {
    state.loading = false;
    state.error = action.payload;
  },
};
