import { PayloadAction } from '@reduxjs/toolkit';
import { PatientEntity } from '../type/patientType';
import { PatientsState } from '../type/patientStateType';
import { PaginatedResponse, Pagination } from '@/shared/type/paginationType';

export const fetchPatientsReducer = {
  fetchPatientsRequest: (state: PatientsState, action: PayloadAction<Pagination>) => {
    state.loading = true;
    state.error = null;
  },
  fetchPatientsSuccess: (state: PatientsState, action: PayloadAction<PaginatedResponse<PatientEntity>>) => {
    state.loading = false;
    state.data = [...state.data, ...action.payload.data];
    state.total = action.payload.total;
    state.offset = action.payload.offset;
    state.limit = action.payload.limit;
  },
  fetchPatientsFailure: (state: PatientsState, action: PayloadAction<string>) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearPatients: (state: PatientsState) => {
    state.data = [];
    state.offset = 0;
    state.total = 0;
  },
};
