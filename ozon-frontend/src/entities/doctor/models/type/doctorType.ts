import { UserEntity } from '@/entities/user/model/type/userType';
import { Timestamp } from '@/shared/type/timestampType';

export interface DoctorEntity extends Timestamp {
  id: number;
  specialization_id: number;
  user: UserEntity;
}

export interface DoctorSpecializationEntity extends Timestamp {
  id: number;
  name: string;
}
