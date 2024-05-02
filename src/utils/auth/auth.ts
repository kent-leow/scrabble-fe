import axios, { AxiosError, HttpStatusCode } from 'axios';
import { LOCAL_STORAGE_KEYS } from '~/utils/constants/localStorageKeys';
import { refresh } from '~/core/apis/auth.api';
import { APP_CONFIG } from '~/utils/constants/appConfig';

export const setToken = (token: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token);
};

export const getToken = () => {
  return (localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN) ?? '').replaceAll(
    '"',
    '',
  );
};

export const removeToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
};

export const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
};

export const getRefreshToken = () => {
  return (
    localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN) ?? ''
  ).replaceAll('"', '');
};

export const removeRefreshToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
};

let interceptor: number;

export const initAxios = (secured: boolean = true) => {
  axios.defaults.withCredentials = secured;
  axios.defaults.baseURL = APP_CONFIG.API_URL;
  axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
  axios.interceptors.response.eject(interceptor);
  if (secured) {
    interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => axiosErrorInterceptor(error),
    );
  }
};

const axiosErrorInterceptor = async (error: AxiosError) => {
  if (error.response?.status === HttpStatusCode.Unauthorized) {
    const originalRequest = error.config!;
    try {
      await requestTokenPromise();
      axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
      originalRequest.headers.Authorization = `Bearer ${getToken()}`;
    } catch (e) {
      removeToken();
      removeRefreshToken();
      window.location.replace(APP_CONFIG.APP_URL);
      return Promise.reject(error);
    }
    return axios.request(originalRequest);
  }
  return Promise.reject(error);
};

let refreshPromise: unknown;

const requestTokenPromise = () => {
  if (!refreshPromise) {
    refreshPromise = requestAccessTokenWithRefreshToken().then(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
};

const requestAccessTokenWithRefreshToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error('No refresh token found');
  }
  const response = await refresh(refreshToken);
  setToken(`"${response.access_token}"`);
  setRefreshToken(`"${response.refresh_token}"`);
};
