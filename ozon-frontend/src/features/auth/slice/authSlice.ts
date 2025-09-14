import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginReducer } from '../reducer/loginReducer';

export interface User {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  email?: string;
  date_of_birth: string;
  is_active: boolean;
  role_id: number;
}

export interface AuthState {
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
    ...loginReducer,
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
