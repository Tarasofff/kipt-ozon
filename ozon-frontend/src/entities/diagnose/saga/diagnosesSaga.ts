import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  fetchDiagnosesRequest,
  fetchDiagnosesSuccess,
  fetchDiagnosesFailure,
  createDiagnoseRequest,
  createDiagnoseSuccess,
  createDiagnoseFailure,
} from '../slice/diagnosesSlice';
import {
  createDiagnose,
  getAllDiagnoses,
} from '@/entities/diagnose/api/diagnose';
import { DiagnosesResponse, CreatedDiagnoseResponse } from '../type/diagnose.type';

function* fetchDiagnosesWorker(action: ReturnType<typeof fetchDiagnosesRequest>) {
  try {
    const { token, tokenType } = yield select((state) => state.auth);
    const { offset, limit } = action.payload;
    const data: DiagnosesResponse = yield call(getAllDiagnoses, token, tokenType, limit, offset);

    yield put(fetchDiagnosesSuccess(data));
  } catch (error: any) {
    yield put(fetchDiagnosesFailure(error.message || 'Ошибка загрузки диагнозов'));
  }
}

function* createDiagnoseWorker(action: ReturnType<typeof createDiagnoseRequest>) {
  try {
    const { token, tokenType } = yield select((state) => state.auth);
    const { name } = action.payload;
    const data: CreatedDiagnoseResponse = yield call(createDiagnose, token, tokenType, name);

    yield put(createDiagnoseSuccess(data));
  } catch (error: any) {
    yield put(createDiagnoseFailure(error.message || 'Ошибка сохранения диагноза'));
  }
}

export function* diagnosesSaga() {
  yield takeLatest(fetchDiagnosesRequest.type, fetchDiagnosesWorker);
  yield takeLatest(createDiagnoseRequest.type, createDiagnoseWorker);
}
