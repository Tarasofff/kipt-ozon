import { PayloadAction } from '@reduxjs/toolkit';
import { DoctorEntity } from '../type/doctorType';
import { PaginatedData, PaginationParams } from '@/shared/type/paginationType';
import { DoctorsState } from '../type/doctorStateType';
import { doctorsInitialState } from '../slice/doctorsInitialState';

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
    state.data = doctorsInitialState.data;
    state.offset = doctorsInitialState.offset;
    state.total = doctorsInitialState.total;
  },
};
