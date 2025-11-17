import { InitialState } from '@/shared/type/initialStateType';
import { UserEntity } from './userType';

export interface UserState extends InitialState {
  user: UserEntity | null;
  token: string | null;
  tokenType: string | null;
}
