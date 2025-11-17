import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchDiagnoseReducer } from '../reducer/fetchDiagnoseReducer';
import { createDiagnoseReducer } from '../reducer/createDiagnoseReducer';
import { DiagnosesState } from '../type/diagnose.type';

const initialState: DiagnosesState = {
  diagnoses: [],
  total: 0,
  offset: 0,
  limit: 15,
  loading: false,
  error: null,
};

export const diagnosesSlice = createSlice({
  name: 'diagnoses',
  initialState,
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
