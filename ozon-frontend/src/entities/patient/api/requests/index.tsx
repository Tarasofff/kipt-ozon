import { http } from '@/shared/api/client';
import { PATIENT_API } from '../routes';
import { AxiosResponse } from 'axios';
import { PaginatedResponse } from '@/shared/type/paginationType';
import { CreatePatientRequest, PatientEntity } from '../../models/type/patientType';
import { createQuery } from '@/shared/lib/query/queryUtils';

export const getPatients = async (limit: number, offset: number): Promise<PaginatedResponse<PatientEntity>> =>
  http.get(`${PATIENT_API.INDEX}${createQuery({ limit, offset })}`).then((res) => res.data);

export const getPatientById = async (patientId: number): Promise<PatientEntity> =>
  http.get(PATIENT_API.GET_BY_ID(patientId)).then((res) => res.data);

export const createPatient = async (patient: CreatePatientRequest): Promise<PatientEntity> =>
  http.post(PATIENT_API.INDEX, patient).then((res) => res.data);

export const getReport = async (
  patientId: number,
  hospitalId: number,
  patientDoctorDiagnoseId: number,
  download: boolean,
): Promise<AxiosResponse<Blob>> =>
  http
    .get(PATIENT_API.GET_REPORT(patientId, hospitalId, patientDoctorDiagnoseId, download), {
      responseType: 'blob',
    })
    .then((res) => res);
