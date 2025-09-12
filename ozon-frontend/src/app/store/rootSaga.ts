import { all } from 'redux-saga/effects';
import { authSaga } from '@/features/auth/saga/authSaga';
import { patientsSaga } from '@/features/patients/saga/patientsSaga';
import { doctorsSaga } from '@/features/doctors/saga/doctorsSaga';
import { diagnosesSaga } from '@/features/diagnoses/saga/diagnosesSaga';

export default function* rootSaga() {
  yield all([authSaga(), patientsSaga(), doctorsSaga(), diagnosesSaga()]);
}
