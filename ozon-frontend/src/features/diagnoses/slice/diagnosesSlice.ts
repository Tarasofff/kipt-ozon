import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchDiagnoseReducer } from '../reducer/fetchDiagnoseReducer';

export interface Diagnose {
  id: number;
  name: string;
}

export interface DiagnosesState {
  diagnoses: Diagnose[];
  total: number;
  offset: number;
  limit: number;
  loading: boolean;
}

const initialState: DiagnosesState = {
  diagnoses: [],
  total: 0,
  offset: 0,
  limit: 100,
  loading: false,
};

export const diagnosesSlice = createSlice({
  name: 'diagnoses',
  initialState,
  reducers: {
    ...fetchDiagnoseReducer,
  },
});

export const { fetchDiagnosesRequest, fetchDiagnosesSuccess, fetchDiagnosesFailure, clearDiagnoses } =
  diagnosesSlice.actions;
