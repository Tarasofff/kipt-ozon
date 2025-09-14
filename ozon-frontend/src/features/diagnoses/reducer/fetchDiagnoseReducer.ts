import { PayloadAction } from '@reduxjs/toolkit';
import { Diagnose, DiagnosesState } from '../slice/diagnosesSlice';

export const fetchDiagnoseReducer = {
  fetchDiagnosesRequest: (state: DiagnosesState, action: PayloadAction<{ offset: number; limit: number }>) => {
    state.loading = true;
  },
  fetchDiagnosesSuccess: (
    state: DiagnosesState,
    action: PayloadAction<{
      diagnoses: Diagnose[];
      total: number;
      offset: number;
      limit: number;
    }>,
  ) => {
    state.loading = false;
    state.diagnoses = [...state.diagnoses, ...action.payload.diagnoses]; // накапливаем
    state.total = action.payload.total;
    state.offset = action.payload.offset;
    state.limit = action.payload.limit;
  },
  fetchDiagnosesFailure: (state: DiagnosesState) => {
    state.loading = false;
  },
  clearDiagnoses: (state: DiagnosesState) => {
    state.diagnoses = [];
    state.offset = 0;
    state.total = 0;
  },
};
