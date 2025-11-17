import { User, UserEntity } from './userType';

export interface RegistrationPayload extends User {
  password: string;
  confirm_password: string;
  specialization_id: number;
}

export interface LoginPayload {
  phone: string;
  password: string;
}

export interface AccessToken {
  token: string;
  token_type: string;
}

export type AuthResponse = UserEntity & AccessToken;
