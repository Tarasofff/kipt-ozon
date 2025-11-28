import { PayloadAction } from '@reduxjs/toolkit';
import { DiagnosesState } from '../type/diagnoseStateType';
import { Diagnose, DiagnoseEntity } from '../type/diagnoseType';

export const createDiagnoseReducer = {
  createDiagnoseRequest: (state: DiagnosesState, action: PayloadAction<Diagnose>) => {
    state.loading = true;
    state.error = null;
  },
  createDiagnoseSuccess: (state: DiagnosesState, action: PayloadAction<DiagnoseEntity>) => {
    state.loading = false;
    state.data.unshift(action.payload);
  },
  createDiagnoseFailure: (state: DiagnosesState, action: PayloadAction<string>) => {
    state.loading = false;
    state.error = action.payload;
  },
};
