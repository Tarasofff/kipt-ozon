import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPatientsReducer } from '../reducers/fetchPatientsReducer';
import { createPatientReducer } from '../reducers/createPatientReducer';
import { patientsInitialState } from './patientsInitialState';
import { patientFilterReducer } from '../reducers/filterPatientsReducer';

export const patientsSlice = createSlice({
  name: 'patients',
  initialState: patientsInitialState,
  reducers: {
    ...fetchPatientsReducer,
    ...createPatientReducer,
    ...patientFilterReducer,
  },
});

export const {
  fetchPatientsRequest,
  fetchPatientsSuccess,
  fetchPatientsFailure,
  createPatientFailure,
  createPatientRequest,
  createPatientSuccess,
  clearPatients,
  setPatientFilterFields,
  resetPatientFilterFields,
  setPatientSortOrder,
  isPatientFilterOpen,
} = patientsSlice.actions;
