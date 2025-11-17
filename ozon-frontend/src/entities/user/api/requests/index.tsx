import { http } from '@/shared/api/client';
import { USER_API } from '../routes';
import { LoginPayload, AuthResponse, RegistrationPayload } from '../../model/type/authType';
import { PaginatedResponse } from '@/shared/type/paginationType';
import { UserRole } from '../../model/type/userType';

export const login = async (payload: LoginPayload): Promise<AuthResponse> =>
  http.post(USER_API.LOGIN, payload).then((res) => res.data);

export const registration = async (payload: RegistrationPayload): Promise<AuthResponse> =>
  http.post(USER_API.REGISTRATION, payload).then((res) => res.data);

// 2 roles
export const getRoles = async (): Promise<PaginatedResponse<UserRole>> =>
  http.get(USER_API.ROLE).then((res) => res.data);
