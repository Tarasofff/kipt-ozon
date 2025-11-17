import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from '@/entities/user/model/slice/userSlice';
import { patientsSlice } from '@/entities/patient/models/slice/patientsSlice';
import { doctorsSlice } from '@/entities/doctor/slice/doctorsSlice';
import { diagnosesSlice } from '@/entities/diagnose/slice/diagnosesSlice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  patients: patientsSlice.reducer,
  doctors: doctorsSlice.reducer,
  diagnoses: diagnosesSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
