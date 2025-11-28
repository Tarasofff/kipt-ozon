import { DiagnosesState } from '../type/diagnoseStateType';

export const diagnosesInitialState: DiagnosesState = {
  data: [],
  total: 0,
  offset: 0,
  limit: 15,
  loading: false,
  error: null,
};
