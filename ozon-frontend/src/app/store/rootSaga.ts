import { all } from 'redux-saga/effects';
import { doctorsSaga } from '@/entities/doctor/saga/doctorsSaga';
import { diagnosesSaga } from '@/entities/diagnose/saga/diagnosesSaga';
import { patientsSaga } from '@/entities/patient/models/saga/patientsSaga';
import { registrationSaga } from '@/entities/user/model/saga/registrationSaga';
import { loginSaga } from '@/entities/user/model/saga/loginSaga';

export default function* rootSaga() {
  yield all([loginSaga(), registrationSaga(), patientsSaga(), doctorsSaga(), diagnosesSaga()]);
}
