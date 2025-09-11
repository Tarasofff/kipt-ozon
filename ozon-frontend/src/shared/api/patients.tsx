import axios from 'axios';
import { API_DEFAULT_URl } from '../constants/api';

export async function getAllPatients(token: string, tokenType: string) {
  return axios
    .get(`${API_DEFAULT_URl}/patient`, { headers: { Authorization: `${tokenType} ${token}` } })
    .then((res) => res.data);
}

export async function getPatientById(token: string, tokenType: string, patientId: number) {
  return axios
    .get(`${API_DEFAULT_URl}/patient/${patientId}`, { headers: { Authorization: `${tokenType} ${token}` } })
    .then((res) => res.data);
}