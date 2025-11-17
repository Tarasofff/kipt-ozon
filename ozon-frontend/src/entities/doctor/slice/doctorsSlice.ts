import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchDoctorReducer } from '../reducer/fetchDoctorReducer';
import { DoctorsState } from '../type/doctor.type';

const initialState: DoctorsState = {
  doctors: [],
  total: 0,
  offset: 0,
  limit: 15,
  loading: false,
};

export const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    ...fetchDoctorReducer,
  },
});

export const { fetchDoctorsRequest, fetchDoctorsSuccess, fetchDoctorsFailure, clearDoctors } = doctorsSlice.actions;
