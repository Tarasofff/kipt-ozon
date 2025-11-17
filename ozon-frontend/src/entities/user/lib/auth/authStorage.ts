import { LocaleStorageUserDataKeys } from '@/shared/constants/localeStorage';
import { User } from '../../model/type/userType';

export const saveAuthData = (token: string, tokenType: string, user: User) => {
  localStorage.setItem(LocaleStorageUserDataKeys.TOKEN, token);
  localStorage.setItem(LocaleStorageUserDataKeys.TOKEN_TYPE, tokenType);
  localStorage.setItem(LocaleStorageUserDataKeys.USER, JSON.stringify(user));
};

export const clearAuthData = () => {
  localStorage.removeItem(LocaleStorageUserDataKeys.TOKEN);
  localStorage.removeItem(LocaleStorageUserDataKeys.TOKEN_TYPE);
  localStorage.removeItem(LocaleStorageUserDataKeys.USER);
};
