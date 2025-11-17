import { LocaleStorageUserDataKeys } from '@/shared/constants/localeStorage';
import { UserState } from '../type/userStateType';

export const userInitialState: UserState = {
  user: JSON.parse(localStorage.getItem(LocaleStorageUserDataKeys.USER) || 'null'),
  token: localStorage.getItem(LocaleStorageUserDataKeys.TOKEN) || null,
  tokenType: localStorage.getItem(LocaleStorageUserDataKeys.TOKEN_TYPE) || null,
  loading: false,
  error: null,
};
