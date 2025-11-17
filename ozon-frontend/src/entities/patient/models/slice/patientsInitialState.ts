import { PatientsState } from '../type/patientStateType';

export const patientsInitialState: PatientsState = {
  data: [],
  total: 0,
  offset: 0,
  limit: 15,
  loading: false,
  error: null,
};
