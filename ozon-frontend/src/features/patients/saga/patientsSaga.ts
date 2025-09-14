import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  fetchPatientsRequest,
  fetchPatientsSuccess,
  fetchPatientsFailure,
  createPatientRequest,
  CreatePatient,
  createPatientSuccess,
  createPatientFailure,
} from '../slice/patientsSlice';
import { CreatedPatientResponse, createPatient, getAllPatients } from '@/shared/api/patients';

function* fetchAllPatientsWorker() {
  try {
    const { token, tokenType } = yield select((state) => state.auth);

    const data = yield call(getAllPatients, token, tokenType);

    yield put(fetchPatientsSuccess(data));
  } catch (err: any) {
    yield put(fetchPatientsFailure(err.message || 'Ошибка загрузки пациентов'));
  }
}

function* createPatientWorker(action: ReturnType<typeof createPatientRequest>) {
  try {
    const { token, tokenType } = yield select((state) => state.auth);

    const data: CreatedPatientResponse = yield call(createPatient, token, tokenType, action.payload);

    yield put(createPatientSuccess(data));
  } catch (error: any) {
    yield put(createPatientFailure(error.message || 'Ошибка создания пациента'));
  }
}

export function* patientsSaga() {
  yield takeLatest(fetchPatientsRequest.type, fetchAllPatientsWorker);
  yield takeLatest(createPatientRequest.type, createPatientWorker);
}
