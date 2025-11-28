import { http } from '@/shared/api/client';
import { DOCTOR_API } from '../routes';
import { PaginatedData, PaginationParams } from '@/shared/type/paginationType';
import { DoctorEntity, DoctorSpecializationEntity } from '../../models/type/doctorType';
import { createQuery } from '@/shared/lib/query/queryUtils';

export const getDoctors = async (params: PaginationParams): Promise<PaginatedData<DoctorEntity>> => {
  const { data } = await http.get(`${DOCTOR_API.INDEX}${createQuery(params)}`);
  return data;
};

export const getDoctorsSpecializations = async (
  params: PaginationParams,
): Promise<PaginatedData<DoctorSpecializationEntity>> => {
  const { data } = await http.get(`${DOCTOR_API.SPECIALIZATION}${createQuery(params)}`);
  return data;
};
