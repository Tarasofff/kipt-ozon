import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchDoctorReducer } from '../reducer/fetchDoctorReducer';

export interface DoctorUser {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  email: string | null;
  date_of_birth: string;
}

export interface Doctor {
  id: number;
  user: DoctorUser;
}

export interface DoctorsState {
  doctors: Doctor[];
  total: number;
  offset: number;
  limit: number;
  loading: boolean;
}

const initialState: DoctorsState = {
  doctors: [],
  total: 0,
  offset: 0,
  limit: 100,
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
