import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/v1/',
  headers: { 'Content-Type': 'application/json' },
});

export interface LoginPayload {
  phone: string;
  password: string;
}

export async function login(payload: LoginPayload) {
  return api.post('/user/login', payload).then((res) => res.data);
}
