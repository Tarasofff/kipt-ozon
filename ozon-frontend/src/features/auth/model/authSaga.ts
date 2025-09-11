import { call, put, takeLatest } from 'redux-saga/effects';
import { login } from '@/shared/api/auth';
import { loginRequest, loginSuccess, loginFailure } from './authSlice';

function* loginWorker(action: ReturnType<typeof loginRequest>) {
  try {
    const data: any = yield call(login, action.payload);

    const user = {
      first_name: data.first_name,
      middle_name: data.middle_name,
      last_name: data.last_name,
      phone: data.phone,
      email: data.email,
      date_of_birth: data.date_of_birth,
      is_active: data.is_active,
      role_id: data.role_id,
    };

    const token = data.token;
    const tokenType = data.token_type;

    localStorage.setItem('token', token);
    localStorage.setItem('token_type', tokenType);
    localStorage.setItem('user', JSON.stringify(user));

    yield put(loginSuccess({ user, token, tokenType }));
  } catch (error: any) {
    yield put(loginFailure(error.response?.data?.message || 'Ошибка входа'));
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, loginWorker);
}
