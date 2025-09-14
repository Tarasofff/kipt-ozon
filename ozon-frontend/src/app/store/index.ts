import { configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';
import createSagaMiddleware from 'redux-saga';

import { i18nSlice } from '../i18n/store';
import rootSaga from './rootSaga';
import { authSlice } from '@/features/auth/slice/authSlice';
import { patientsSlice } from '@/features/patients/slice/patientsSlice';
import { doctorsSlice } from '@/features/doctors/slice/doctorsSlice';
import { diagnosesSlice } from '@/features/diagnoses/slice/diagnosesSlice';

enableMapSet();

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    i18n: i18nSlice.reducer,
    auth: authSlice.reducer,
    patients: patientsSlice.reducer,
    doctors: doctorsSlice.reducer,
    diagnoses: diagnosesSlice.reducer,
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
