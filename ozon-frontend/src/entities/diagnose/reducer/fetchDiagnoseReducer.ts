import { PayloadAction } from '@reduxjs/toolkit';
import { DiagnosesState, Diagnose } from '../type/diagnose.type';

export const fetchDiagnoseReducer = {
  fetchDiagnosesRequest: (state: DiagnosesState, action: PayloadAction<{ offset: number; limit: number }>) => {
    state.loading = true;
    state.error = null;
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
    state.diagnoses = Array.from(
      new Map(
        [...state.diagnoses, ...action.payload.diagnoses].map((diagnose) => [diagnose.id, diagnose])
      ).values()
    );
    state.total = action.payload.total;
    state.offset = action.payload.offset;
    state.limit = action.payload.limit;
  },
  fetchDiagnosesFailure: (state: DiagnosesState, action: PayloadAction<string>) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearDiagnoses: (state: DiagnosesState) => {
    state.diagnoses = [];
    state.offset = 0;
    state.total = 0;
  },
};
