import { PayloadAction } from '@reduxjs/toolkit';
import { DoctorEntity } from '../type/doctorType';
import { PaginatedData, PaginationParams } from '@/shared/type/paginationType';
import { DoctorsState } from '../type/doctorStateType';

export const fetchDoctorReducer = {
  fetchDoctorsRequest: (state: DoctorsState, action: PayloadAction<PaginationParams>) => {
    state.loading = true;
    state.error = null;
  },
  fetchDoctorsSuccess: (state: DoctorsState, action: PayloadAction<PaginatedData<DoctorEntity>>) => {
    state.loading = false;
    state.data = [...state.data, ...action.payload.data];
    state.total = action.payload.total;
    state.offset = action.payload.offset;
    state.limit = action.payload.limit;
  },
  fetchDoctorsFailure: (state: DoctorsState, action: PayloadAction<string>) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearDoctors: (state: DoctorsState) => {
    state.data = [];
    state.offset = 0;
    state.total = 0;
  },
};
