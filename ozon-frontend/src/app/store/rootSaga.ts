import { all } from 'redux-saga/effects';
import { authSaga } from '@/features/auth/model/authSaga';

export default function* rootSaga() {
  yield all([authSaga()]);
}
