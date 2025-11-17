import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPatientsReducer } from '../reducers/fetchPatientsReducer';
import { createPatientReducer } from '../reducers/createPatientReducer';
import { patientsInitialState } from './patientsInitialState';

export const patientsSlice = createSlice({
  name: 'patients',
  initialState: patientsInitialState,
  reducers: {
    ...fetchPatientsReducer,
    ...createPatientReducer,
  },
});

export const {
  fetchPatientsRequest,
  fetchPatientsSuccess,
  fetchPatientsFailure,
  createPatientFailure,
  createPatientRequest,
  createPatientSuccess,
} = patientsSlice.actions;
