import { configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';
import createSagaMiddleware from 'redux-saga';

import { i18nSlice } from '../i18n/store';
import rootSaga from './rootSaga';
import { authSlice } from '@/features/auth/model/authSlice';

enableMapSet();

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    i18n: i18nSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type GetState = typeof store.getState;
export type RootState = ReturnType<GetState>;

export { useTypedSelector, useTypedDispatch } from './hooks';
