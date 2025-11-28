import { PayloadAction } from '@reduxjs/toolkit';
import { DiagnoseEntity } from '../type/diagnoseType';
import { DiagnosesState } from '../type/diagnoseStateType';
import { PaginatedData, PaginationParams } from '@/shared/type/paginationType';

export const fetchDiagnoseReducer = {
  fetchDiagnosesRequest: (state: DiagnosesState, action: PayloadAction<PaginationParams>) => {
    state.loading = true;
    state.error = null;
  },
  fetchDiagnosesSuccess: (state: DiagnosesState, action: PayloadAction<PaginatedData<DiagnoseEntity>>) => {
    state.loading = false;
    state.data = Array.from(
      new Map([...state.data, ...action.payload.data].map((diagnose) => [diagnose.id, diagnose])).values(),
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
    state.data = [];
    state.offset = 0;
    state.total = 0;
  },
};
