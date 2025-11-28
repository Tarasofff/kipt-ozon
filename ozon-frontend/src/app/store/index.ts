import { configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';
import createSagaMiddleware from 'redux-saga';

import { i18nSlice } from '../../features/i18n/store/store';
import rootSaga from './rootSaga';
import { userSlice } from '@/entities/user/model/slice/userSlice';
import { patientsSlice } from '@/entities/patient/models/slice/patientsSlice';
import { doctorsSlice } from '@/entities/doctor/models/slice/doctorsSlice';
import { diagnosesSlice } from '@/entities/diagnose/models/slice/diagnosesSlice';

enableMapSet();

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    i18n: i18nSlice.reducer,
    user: userSlice.reducer,
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
