import { PatientsFilterState, PatientsState } from '../type/patientStateType';

const patientsFilterInitialState: PatientsFilterState = {
  fields: {
    last_name: '',
    first_name: '',
    middle_name: '',
    phone: '',
    date_of_birth: '',
    email: '',
    is_active: '',
  },
  isOpen: false,
};

export const patientsInitialState: PatientsState = {
  data: [],
  total: 0,
  offset: 0,
  limit: 15,
  filter: patientsFilterInitialState,
  loading: false,
  error: null,
};
