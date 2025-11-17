import axios from 'axios';
import { CONFIG.API_URL } from '../../../shared/constants/api';
import { CreatedDiagnoseResponse, DiagnosesResponse } from '../type/diagnose.type';

export async function getAllDiagnoses(
  token: string,
  tokenType: string,
  limit: number,
  offset: number,
): Promise<DiagnosesResponse> {
  return axios
    .get(`${CONFIG.API_URL}/diagnose?limit=${limit}&offset=${offset}`, {
      headers: { Authorization: `${tokenType} ${token}` },
    })
    .then((res) => res.data);
}

export async function createDiagnose(token: string, tokenType: string, name: string): Promise<CreatedDiagnoseResponse> {
  const payload = { name };
  return axios
    .post(`${CONFIG.API_URL}/diagnose`, payload, {
      headers: { Authorization: `${tokenType} ${token}` },
    })
    .then((res) => res.data);
}
