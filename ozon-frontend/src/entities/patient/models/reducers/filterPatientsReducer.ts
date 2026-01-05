import { PayloadAction } from '@reduxjs/toolkit';
import { PatientsState, PatientsFilterFields } from '../type/patientStateType';
import { patientsInitialState } from '../slice/patientsInitialState';

export const patientFilterReducer = {
  setPatientFilterFields: (state: PatientsState, action: PayloadAction<Partial<PatientsFilterFields>>) => {
    state.filter.fields = {
      ...state.filter.fields,
      ...action.payload,
    };
  },
  isPatientFilterOpen: (state: PatientsState, action: PayloadAction<boolean>) => {
    state.filter.isOpen = action.payload;
  },
  resetPatientFilterFields: (state: PatientsState) => {
    state.filter.fields = { ...patientsInitialState.filter.fields };
  },
};
