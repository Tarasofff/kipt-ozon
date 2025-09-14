import axios from 'axios';
import { API_DEFAULT_URl } from '../constants/api';

export interface LoginPayload {
  phone: string;
  password: string;
}

export async function login(payload: LoginPayload) {
  return axios
    .post(`${API_DEFAULT_URl}/user/login`, payload, { headers: { 'Content-Type': 'application/json' } })
    .then((res) => res.data);
}
