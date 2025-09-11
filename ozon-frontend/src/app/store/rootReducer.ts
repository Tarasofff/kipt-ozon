import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from '@/features/auth/model/authSlice';
import { patientsSlice } from '@/features/patients/model/patientsSlice';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  patients: patientsSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
