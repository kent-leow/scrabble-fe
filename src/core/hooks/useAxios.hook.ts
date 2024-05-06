import axios, { AxiosError, HttpStatusCode } from 'axios';
import { APP_CONFIG } from '~/utils/constants/appConfig';
import { useLocalStorage } from '@uidotdev/usehooks';
import { LOCAL_STORAGE_KEYS } from '~/utils/constants/localStorageKeys';
import { useAuthAPI } from '~/core/hooks/apis/useAuthAPI.hook';

let interceptor: number;
let refreshPromise: unknown;
let tempToken: string | undefined;

export const useAxiosHook = () => {
  const { postAuthRefresh } = useAuthAPI();
  const [token, setToken] = useLocalStorage<string | undefined>(
    LOCAL_STORAGE_KEYS.TOKEN,
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string | undefined>(
    LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
  );

  const initAxios = (secured: boolean = true) => {
    axios.defaults.withCredentials = secured;
    axios.defaults.baseURL = APP_CONFIG.API_URL;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.interceptors.response.eject(interceptor);
    if (secured) {
      interceptor = axios.interceptors.response.use(
        (response) => response,
        (error) => axiosErrorInterceptor(error),
      );
    }
  };

  const axiosErrorInterceptor = async (error: AxiosError) => {
    if (error.response?.status === HttpStatusCode.Unauthorized && token) {
      const originalRequest = error.config!;
      try {
        await requestTokenPromise();
        axios.defaults.headers.common['Authorization'] = `Bearer ${tempToken}`;
        originalRequest.headers.Authorization = `Bearer ${tempToken}`;
      } catch (e) {
        setToken(undefined);
        setRefreshToken(undefined);
        window.location.replace(APP_CONFIG.APP_URL);
        return Promise.reject(error);
      }
      return axios.request(originalRequest);
    }
    return Promise.reject(error);
  };

  const requestTokenPromise = () => {
    if (!refreshPromise) {
      refreshPromise = requestAccessTokenWithRefreshToken().then(() => {
        refreshPromise = null;
      });
    }
    return refreshPromise;
  };

  const requestAccessTokenWithRefreshToken = async () => {
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }
    const response = await postAuthRefresh(refreshToken);
    tempToken = response.accessToken;
    setToken(response.accessToken);
    setRefreshToken(response.refreshToken);
  };

  return [initAxios];
};
