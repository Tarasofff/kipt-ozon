import { removeUnusedObjectFields } from '@/shared/lib/helpers';
import { http } from '../client';

http.interceptors.request.use(
  (request) => {
    if (!request.url) return request;

    const [base, queryString] = request.url.split('?');

    if (!queryString) return request;

    const paramsObj = Object.fromEntries(new URLSearchParams(queryString).entries());
    const cleanedParams = removeUnusedObjectFields(paramsObj) as Record<string, string>;
    const newQueryString = new URLSearchParams(cleanedParams).toString();

    request.url = newQueryString ? `${base}?${newQueryString}` : base;

    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);
