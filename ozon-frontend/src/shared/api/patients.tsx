import axios from 'axios';
import { API_DEFAULT_URl } from '../constants/api';
import { CreatePatient } from '@/features/patients/slice/patientsSlice';

export interface CreatedPatientResponse {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  date_of_birth: string;
  email: string | null;
  is_active: boolean;
  notes: string | null;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export const getAllPatients = async (token: string, tokenType: string) => {
  return axios
    .get(`${API_DEFAULT_URl}/patient`, { headers: { Authorization: `${tokenType} ${token}` } })
    .then((res) => res.data);
};

export const getPatientById = async (token: string, tokenType: string, patientId: number) => {
  return axios
    .get(`${API_DEFAULT_URl}/patient/${patientId}`, { headers: { Authorization: `${tokenType} ${token}` } })
    .then((res) => res.data);
};

export const createPatient = async (
  token: string,
  tokenType: string,
  patient: CreatePatient,
): Promise<CreatedPatientResponse> => {
  return axios
    .post(`${API_DEFAULT_URl}/patient`, patient, { headers: { Authorization: `${tokenType} ${token}` } })
    .then((res) => res.data);
};