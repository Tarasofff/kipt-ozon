import { PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../type/userStateType';
import { LoginPayload } from '../type/authType';
import { clearAuthData } from '../../lib/auth/authStorage';

export const loginReducer = {
  loginRequest: (state: UserState, action: PayloadAction<LoginPayload>) => {
    state.loading = true;
    state.error = null;
  },
  loginSuccess: (state: UserState, action: PayloadAction<Pick<UserState, 'user' | 'token' | 'tokenType'>>) => {
    state.loading = false;
    state.user = action.payload.user;
    state.token = action.payload.token;
    state.tokenType = action.payload.tokenType;
  },
  loginFailure: (state: UserState, action: PayloadAction<string>) => {
    state.loading = false;
    state.error = action.payload;
  },
  logout: (state: UserState) => {
    state.user = null;
    state.token = null;
    state.tokenType = null;

    clearAuthData();
  },
};
