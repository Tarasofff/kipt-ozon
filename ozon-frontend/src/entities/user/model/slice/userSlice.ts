import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginReducer } from '../reducer/loginReducer';
import { registrationReducer } from '../reducer/registrationReducer';
import { userInitialState } from './userInitialState';

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    ...loginReducer,
    ...registrationReducer,
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  registrationRequest,
  registrationSuccess,
  registrationFailure,
} = userSlice.actions;
