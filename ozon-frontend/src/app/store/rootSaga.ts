import { all } from 'redux-saga/effects';
import { authSaga } from '@/features/auth/model/authSaga';
import { patientsSaga } from '@/features/patients/model/patientsSaga';

export default function* rootSaga() {
  yield all([authSaga(), patientsSaga()]);
}
