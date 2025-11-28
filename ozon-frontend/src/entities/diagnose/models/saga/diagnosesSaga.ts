import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchDiagnosesRequest,
  fetchDiagnosesSuccess,
  fetchDiagnosesFailure,
  createDiagnoseRequest,
  createDiagnoseSuccess,
  createDiagnoseFailure,
} from '../slice/diagnosesSlice';
import { PaginatedData } from '@/shared/type/paginationType';
import { DiagnoseEntity } from '../type/diagnoseType';
import { createDiagnose, getDiagnoses } from '../../api/requests';

function* fetchDiagnosesWorker(action: ReturnType<typeof fetchDiagnosesRequest>) {
  try {
    const data: PaginatedData<DiagnoseEntity> = yield call(getDiagnoses, action.payload);
    console.log(12, data);

    yield put(fetchDiagnosesSuccess(data));
  } catch (error: any) {
    yield put(fetchDiagnosesFailure(error?.message || 'Ошибка загрузки диагнозов'));
  }
}

function* createDiagnoseWorker(action: ReturnType<typeof createDiagnoseRequest>) {
  try {
    const data: DiagnoseEntity = yield call(createDiagnose, action.payload);

    yield put(createDiagnoseSuccess(data));
  } catch (error: any) {
    yield put(createDiagnoseFailure(error?.message || 'Ошибка сохранения диагноза'));
  }
}

export function* diagnosesSaga() {
  yield takeLatest(fetchDiagnosesRequest.type, fetchDiagnosesWorker);
  yield takeLatest(createDiagnoseRequest.type, createDiagnoseWorker);
}
