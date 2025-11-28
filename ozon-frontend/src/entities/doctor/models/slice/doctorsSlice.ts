import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchDoctorReducer } from '../reducer/fetchDoctorReducer';
import { doctorsInitialState } from './doctorsInitialState';

export const doctorsSlice = createSlice({
  name: 'doctors',
  initialState: doctorsInitialState,
  reducers: {
    ...fetchDoctorReducer,
  },
});

export const { fetchDoctorsRequest, fetchDoctorsSuccess, fetchDoctorsFailure, clearDoctors } = doctorsSlice.actions;
