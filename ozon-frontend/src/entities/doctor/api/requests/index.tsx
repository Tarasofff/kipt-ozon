import { http } from '@/shared/api/client';
import { DOCTOR_API } from '../routes';
import { AllDoctorsResponse } from '../../type/doctor.type';

export const getAllDoctors = async (limit: number, offset: number): Promise<AllDoctorsResponse> =>
  http.get(`${DOCTOR_API.INDEX}?limit=${limit}&offset=${offset}`).then((res) => res.data);

export const getAllDoctorsSpecializations = async (limit: number, offset: number) =>
  http.get(`${DOCTOR_API.SPECIALIZATION}?limit=${limit}&offset=${offset}`).then((res) => res.data);
