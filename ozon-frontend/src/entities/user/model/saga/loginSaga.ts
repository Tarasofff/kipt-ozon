import { call, put, takeLatest } from 'redux-saga/effects';
import { login } from '@/entities/user/api/requests';
import { loginRequest, loginSuccess, loginFailure } from '../slice/userSlice';
import { saveAuthData } from '@/entities/user/lib/auth/authStorage';
import { AuthResponse } from '../type/authType';
import { UserEntity } from '../type/userType';

function* loginWorker(action: ReturnType<typeof loginRequest>) {
  try {
    const {
      id,
      first_name,
      middle_name,
      last_name,
      phone,
      email,
      date_of_birth,
      role_id,
      token,
      token_type,
    }: AuthResponse = yield call(login, action.payload);

    const user: UserEntity = {
      id,
      first_name,
      middle_name,
      last_name,
      phone,
      email,
      date_of_birth,
      role_id,
    };

    saveAuthData(token, token_type, user);

    yield put(loginSuccess({ user, token, tokenType: token_type }));
  } catch (error: any) {
    yield put(loginFailure(error.response?.data?.message || 'Ошибка входа'));
  }
}

export function* loginSaga() {
  yield takeLatest(loginRequest.type, loginWorker);
}
