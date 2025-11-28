import { SortOrder } from '@/shared/type/sortType';
import { PayloadAction } from '@reduxjs/toolkit';
import { PatientsState, PatientsFilterFields } from '../type/patientStateType';
import { patientsFilterInitialState } from '../slice/patientsInitialState';

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
    state.filter.fields = { ...patientsFilterInitialState.fields };
  },
  setPatientSortOrder: (state: PatientsState, action: PayloadAction<SortOrder>) => {
    // state.filter.sortOrder = action.payload;
  },
};
