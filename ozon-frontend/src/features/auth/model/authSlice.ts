import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  first_name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  email?: string;
  date_of_birth: string;
  is_active: boolean;
  role_id: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  tokenType: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token') || null,
  tokenType: localStorage.getItem('token_type') || null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<{ phone: string; password: string }>) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string; tokenType: string }>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.tokenType = action.payload.tokenType;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
