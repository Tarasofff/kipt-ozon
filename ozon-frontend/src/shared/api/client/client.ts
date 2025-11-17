import { CONFIG } from '@/shared/config';
import axios from 'axios';

export const http = axios.create({
  baseURL: CONFIG.API_URL,
  headers: { 'Content-Type': 'application/json' },
});
