import { call, put, takeLatest } from 'redux-saga/effects';
import { login, registration } from '@/entities/user/api/requests';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registrationRequest,
  registrationSuccess,
  registrationFailure,
} from '../slice/userSlice';
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
    yield put(loginFailure(error?.message || 'Ошибка входа'));
  }
}

function* registrationWorker(action: ReturnType<typeof registrationRequest>) {
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
    }: AuthResponse = yield call(registration, action.payload);

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

    yield put(registrationSuccess());
    yield put(loginSuccess({ user, token, tokenType: token_type }));
  } catch (error: any) {
    yield put(registrationFailure(error?.message || 'Ошибка регистрации'));
    yield put(loginFailure(error?.message || 'Ошибка входа'));
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, loginWorker);
  yield takeLatest(registrationRequest.type, registrationWorker);
}
