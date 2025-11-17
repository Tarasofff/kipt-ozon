import { LocaleStorageUserDataKeys } from '@/shared/constants/localeStorage';
import { http } from '../client';

http.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem(LocaleStorageUserDataKeys.TOKEN);
    const tokenType = localStorage.getItem(LocaleStorageUserDataKeys.TOKEN_TYPE);

    if (accessToken) {
      request.headers['Authorization'] = `${tokenType} ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);
