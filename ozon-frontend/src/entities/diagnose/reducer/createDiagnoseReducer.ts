import { PayloadAction } from '@reduxjs/toolkit';
import { DiagnosesState, CreateDiagnose, CreatedDiagnoseResponse } from '../type/diagnose.type';

export const createDiagnoseReducer = {
  createDiagnoseRequest: (state: DiagnosesState, action: PayloadAction<CreateDiagnose>) => {
    state.loading = true;
    state.error = null;
  },
  createDiagnoseSuccess: (state: DiagnosesState, action: PayloadAction<CreatedDiagnoseResponse>) => {
    state.loading = false;
    state.diagnoses.unshift(action.payload);
  },
  createDiagnoseFailure: (state: DiagnosesState, action: PayloadAction<string>) => {
    state.loading = false;
    state.error = action.payload;
  },
};
