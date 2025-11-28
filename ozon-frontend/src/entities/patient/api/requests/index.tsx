import { http } from '@/shared/api/client';
import { PATIENT_API } from '../routes';
import { AxiosResponse } from 'axios';
import { PaginatedData } from '@/shared/type/paginationType';
import { CreatePatientRequest, PatientEntity, PatientsFilterQuery } from '../../models/type/patientType';
import { createQuery } from '@/shared/lib/query/queryUtils';

export const getPatients = async (params: PatientsFilterQuery): Promise<PaginatedData<PatientEntity>> => {
  const { data } = await http.get(`${PATIENT_API.FILTER}${createQuery(params)}`);
  return data;
};

export const getPatientById = async (patientId: number): Promise<PatientEntity> => {
  const { data } = await http.get(PATIENT_API.GET_BY_ID(patientId));
  return data;
};

export const createPatient = async (patient: CreatePatientRequest): Promise<PatientEntity> => {
  const { data } = await http.post(PATIENT_API.CREATE, patient);
  return data;
};

export const getPatientReport = async (
  patientId: number,
  hospitalId: number,
  patientDoctorDiagnoseId: number,
  download: boolean,
): Promise<AxiosResponse<Blob>> => {
  const res = await http.get(PATIENT_API.GET_REPORT(patientId, hospitalId, patientDoctorDiagnoseId, download), {
    responseType: 'blob',
  });

  return res;
};
