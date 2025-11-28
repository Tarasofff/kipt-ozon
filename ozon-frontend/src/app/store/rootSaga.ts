import { all } from 'redux-saga/effects';
import { doctorsSaga } from '@/entities/doctor/models/saga/doctorsSaga';
import { diagnosesSaga } from '@/entities/diagnose/models/saga/diagnosesSaga';
import { patientsSaga } from '@/entities/patient/models/saga/patientsSaga';
import { authSaga } from '@/entities/user/model/saga/authSaga';

export default function* rootSaga() {
  yield all([authSaga(), patientsSaga(), doctorsSaga(), diagnosesSaga()]);
}
