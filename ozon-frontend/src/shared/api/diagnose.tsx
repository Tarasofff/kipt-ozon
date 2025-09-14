import axios from 'axios';
import { API_DEFAULT_URl } from '../constants/api';
import { Diagnose } from '@/features/diagnoses/slice/diagnosesSlice';

export interface DiagnosesResponse {
  diagnoses: Diagnose[];
  total: number;
  limit: number;
  offset: number;
}

export async function getAllDiagnoses(
  token: string,
  tokenType: string,
  limit: number,
  offset: number,
): Promise<DiagnosesResponse> {
  return axios
    .get(`${API_DEFAULT_URl}/diagnose?limit=${limit}&offset=${offset}`, {
      headers: { Authorization: `${tokenType} ${token}` },
    })
    .then((res) => res.data);
}
