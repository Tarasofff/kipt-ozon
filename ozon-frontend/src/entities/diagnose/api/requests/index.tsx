import { http } from '@/shared/api/client';
import { DIAGNOSE_API } from '../routes';
import { createQuery } from '@/shared/lib/query/queryUtils';
import { PaginatedData, PaginationParams } from '@/shared/type/paginationType';
import { Diagnose, DiagnoseEntity } from '../../models/type/diagnoseType';

export const getDiagnoses = async (params: PaginationParams): Promise<PaginatedData<DiagnoseEntity>> => {
  const { data } = await http.get(`${DIAGNOSE_API.INDEX}${createQuery(params)}`);
  return data;
};

export const createDiagnose = async (diagnose: Diagnose): Promise<DiagnoseEntity> => {
  const { data } = await http.post(DIAGNOSE_API.INDEX, diagnose);
  return data;
};
