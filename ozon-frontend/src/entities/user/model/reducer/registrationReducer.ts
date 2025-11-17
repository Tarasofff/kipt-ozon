import { PayloadAction } from '@reduxjs/toolkit';
import { RegistrationPayload } from '../type/authType';
import { UserState } from '../type/userStateType';

export const registrationReducer = {
  registrationRequest: (state: UserState, action: PayloadAction<RegistrationPayload>) => {
    state.loading = true;
    state.error = null;
  },
  registrationSuccess: (state: UserState) => {
    state.loading = false;
  },
  registrationFailure: (state: UserState, action: PayloadAction<string>) => {
    state.loading = false;
    state.error = action.payload;
  },
};
