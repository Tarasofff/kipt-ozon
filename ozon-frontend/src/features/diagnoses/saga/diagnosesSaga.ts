import { call, put, select, takeLatest } from 'redux-saga/effects';
import { fetchDiagnosesRequest, fetchDiagnosesSuccess, fetchDiagnosesFailure } from '../slice/diagnosesSlice';
import { DiagnosesResponse, getAllDiagnoses } from '@/shared/api/diagnose';

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

export function* diagnosesSaga() {
  yield takeLatest(fetchDiagnosesRequest.type, fetchDiagnosesWorker);
}
