import { DoctorsState } from '../type/doctorStateType';

export const doctorsInitialState: DoctorsState = {
  data: [],
  total: 0,
  offset: 0,
  limit: 15,
  loading: false,
  error: null,
};
