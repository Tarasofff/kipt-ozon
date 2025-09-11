import { call, put, select, takeLatest } from 'redux-saga/effects';
import { fetchPatientsRequest, fetchPatientsSuccess, fetchPatientsFailure } from './patientsSlice';
import { getAllPatients } from '@/shared/api/patients';

function* fetchAllPatientsWorker() {
  try {
    const { token, tokenType } = yield select((state) => state.auth);

    const data = yield call(getAllPatients, token, tokenType);

    yield put(fetchPatientsSuccess(data));
  } catch (err: any) {
    yield put(fetchPatientsFailure(err.message || 'Ошибка загрузки пациентов'));
  }
}

export function* patientsSaga() {
  yield takeLatest(fetchPatientsRequest.type, fetchAllPatientsWorker);
}
