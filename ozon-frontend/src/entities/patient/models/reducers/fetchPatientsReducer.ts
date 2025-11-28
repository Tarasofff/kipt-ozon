import { PayloadAction } from '@reduxjs/toolkit';
import { PatientEntity, PatientsFilterQuery } from '../type/patientType';
import { PatientsState } from '../type/patientStateType';
import { PaginatedData } from '@/shared/type/paginationType';

export const fetchPatientsReducer = {
  fetchPatientsRequest: (state: PatientsState, action: PayloadAction<PatientsFilterQuery>) => {
    state.loading = true;
    state.error = null;
  },
  fetchPatientsSuccess: (state: PatientsState, action: PayloadAction<PaginatedData<PatientEntity>>) => {
    state.loading = false;
    // state.data = [...state.data, ...action.payload.data];
    state.data = Array.from(
      new Map([...state.data, ...action.payload.data].map((patient) => [patient.id, patient])).values(),
    );
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
