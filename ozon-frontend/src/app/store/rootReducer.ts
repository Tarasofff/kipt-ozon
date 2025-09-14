import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from '@/features/auth/slice/authSlice';
import { patientsSlice } from '@/features/patients/slice/patientsSlice';
import { doctorsSlice } from '@/features/doctors/slice/doctorsSlice';
import { diagnosesSlice } from '@/features/diagnoses/slice/diagnosesSlice';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  patients: patientsSlice.reducer,
  doctors: doctorsSlice.reducer,
  diagnoses: diagnosesSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
