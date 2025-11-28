import { http } from '@/shared/api/client';
import { USER_API } from '../routes';
import { LoginPayload, AuthResponse, RegistrationPayload } from '../../model/type/authType';
import { PaginatedData } from '@/shared/type/paginationType';
import { UserRoleEntity } from '../../model/type/userType';

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await http.post(USER_API.LOGIN, payload);
  return data;
};

export const registration = async (payload: RegistrationPayload): Promise<AuthResponse> => {
  const { data } = await http.post(USER_API.REGISTRATION, payload);
  return data;
};

// only 2 roles
export const getRoles = async (): Promise<PaginatedData<UserRoleEntity>> => {
  const { data } = await http.get(USER_API.ROLE);
  return data;
};
