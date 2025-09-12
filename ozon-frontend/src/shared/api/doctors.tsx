import axios from 'axios';
import { API_DEFAULT_URl } from '../constants/api';
import { Doctor } from '@/features/doctors/slice/doctorsSlice';

export interface DoctorsResponse {
  doctors: Doctor[];
  total: number;
  limit: number;
  offset: number;
}

export async function getAllDoctors(
  token: string,
  tokenType: string,
  limit: number,
  offset: number,
): Promise<DoctorsResponse> {
  return axios
    .get(`${API_DEFAULT_URl}/doctor?limit=${limit}&offset=${offset}`, {
      headers: { Authorization: `${tokenType} ${token}` },
    })
    .then((res) => res.data);
}
