import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchPatientsRequest,
  fetchPatientsSuccess,
  fetchPatientsFailure,
  createPatientRequest,
  createPatientSuccess,
  createPatientFailure,
} from '../slice/patientsSlice';
import { createPatient, getPatients } from '@/entities/patient/api/requests';
import { PatientEntity } from '../type/patientType';
import { PaginatedData } from '@/shared/type/paginationType';

function* fetchPatientsWorker(action: ReturnType<typeof fetchPatientsRequest>) {
  try {
    const data: PaginatedData<PatientEntity> = yield call(getPatients, action.payload);

    yield put(fetchPatientsSuccess(data));
  } catch (error: any) {
    yield put(fetchPatientsFailure(error?.message || 'Ошибка загрузки пациентов'));
  }
}

function* createPatientWorker(action: ReturnType<typeof createPatientRequest>) {
  try {
    const data: PatientEntity = yield call(createPatient, action.payload);

    yield put(createPatientSuccess(data));
  } catch (error: any) {
    yield put(createPatientFailure(error?.message || 'Ошибка создания пациента'));
  }
}

export function* patientsSaga() {
  yield takeLatest(fetchPatientsRequest.type, fetchPatientsWorker);
  yield takeLatest(createPatientRequest.type, createPatientWorker);
}
