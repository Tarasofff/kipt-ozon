import { call, put, select, takeLatest } from 'redux-saga/effects';
import { fetchDoctorsRequest, fetchDoctorsSuccess, fetchDoctorsFailure } from '../slice/doctorsSlice';
import { DoctorsResponse, getAllDoctors } from '@/shared/api/doctors';

function* fetchDoctorsWorker(action: ReturnType<typeof fetchDoctorsRequest>) {
  try {
    const { token, tokenType } = yield select((state) => state.auth);
    const { offset, limit } = action.payload;
    const data: DoctorsResponse = yield call(getAllDoctors, token, tokenType, limit, offset);

    yield put(fetchDoctorsSuccess(data));
  } catch (error: any) {
    yield put(fetchDoctorsFailure(error.message || 'Ошибка загрузки докторов'));
  }
}

export function* doctorsSaga() {
  yield takeLatest(fetchDoctorsRequest.type, fetchDoctorsWorker);
}
