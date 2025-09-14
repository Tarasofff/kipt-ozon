import { PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../slice/authSlice';

export const loginReducer = {
  loginRequest: (state: AuthState, action: PayloadAction<{ phone: string; password: string }>) => {
    state.loading = true;
    state.error = null;
  },
  loginSuccess: (state: AuthState, action: PayloadAction<{ user: User; token: string; tokenType: string }>) => {
    state.loading = false;
    state.user = action.payload.user;
    state.token = action.payload.token;
    state.tokenType = action.payload.tokenType;
  },
  loginFailure: (state: AuthState, action: PayloadAction<string>) => {
    state.loading = false;
    state.error = action.payload;
  },
  logout: (state: AuthState) => {
    state.user = null;
    state.token = null;
    state.tokenType = null;
  },
};
