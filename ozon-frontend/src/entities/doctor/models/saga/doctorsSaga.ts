import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchDoctorsRequest, fetchDoctorsSuccess, fetchDoctorsFailure } from '../slice/doctorsSlice';
import { PaginatedData } from '@/shared/type/paginationType';
import { DoctorEntity } from '../type/doctorType';
import { getDoctors } from '../../api/requests';

function* fetchDoctorsWorker(action: ReturnType<typeof fetchDoctorsRequest>) {
  try {
    const data: PaginatedData<DoctorEntity> = yield call(getDoctors, action.payload);

    yield put(fetchDoctorsSuccess(data));
  } catch (error: any) {
    yield put(fetchDoctorsFailure(error?.message || 'Ошибка загрузки докторов'));
  }
}

export function* doctorsSaga() {
  yield takeLatest(fetchDoctorsRequest.type, fetchDoctorsWorker);
}
