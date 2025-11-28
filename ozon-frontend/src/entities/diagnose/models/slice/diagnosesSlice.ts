import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchDiagnoseReducer } from '../reducer/fetchDiagnoseReducer';
import { createDiagnoseReducer } from '../reducer/createDiagnoseReducer';
import { diagnosesInitialState } from './diagnosesState';

export const diagnosesSlice = createSlice({
  name: 'diagnoses',
  initialState: diagnosesInitialState,
  reducers: {
    ...fetchDiagnoseReducer,
    ...createDiagnoseReducer,
  },
});

export const {
  fetchDiagnosesRequest,
  fetchDiagnosesSuccess,
  fetchDiagnosesFailure,
  clearDiagnoses,
  createDiagnoseFailure,
  createDiagnoseRequest,
  createDiagnoseSuccess,
} = diagnosesSlice.actions;
