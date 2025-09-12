import { PayloadAction } from '@reduxjs/toolkit';
import { Doctor, DoctorsState } from '../slice/doctorsSlice';

export const fetchDoctorReducer = {
  fetchDoctorsRequest: (state: DoctorsState, action: PayloadAction<{ offset: number; limit: number }>) => {
    state.loading = true;
  },
  fetchDoctorsSuccess: (
    state: DoctorsState,
    action: PayloadAction<{
      doctors: Doctor[];
      total: number;
      offset: number;
      limit: number;
    }>,
  ) => {
    state.loading = false;
    state.doctors = [...state.doctors, ...action.payload.doctors]; // накапливаем
    state.total = action.payload.total;
    state.offset = action.payload.offset;
    state.limit = action.payload.limit;
  },
  fetchDoctorsFailure: (state: DoctorsState) => {
    state.loading = false;
  },
  clearDoctors: (state: DoctorsState) => {
    state.doctors = [];
    state.offset = 0;
    state.total = 0;
  },
};
