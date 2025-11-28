import { Timestamp } from '@/shared/type/timestampType';

export interface User {
  first_name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  email: string | null;
  date_of_birth: string;
  role_id: number;
}

export interface UserRoleEntity extends Timestamp {
  id: number;
  name: string;
}

export interface UserEntity extends User, Timestamp {
  id: number;
}
