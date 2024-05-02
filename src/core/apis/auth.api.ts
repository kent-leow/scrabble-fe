import axios from 'axios';
import { initAxios } from '~/utils/auth/auth';
import {
  IAuthResponse,
  ILoginForm,
  IRegisterForm,
} from '~/core/domains/auth/auth.type';

export const login = async (loginForm: ILoginForm) => {
  initAxios(false);
  const response = await axios.post<IAuthResponse>('/auth/login', loginForm);
  return response.data;
};

export const register = async (registerForm: IRegisterForm) => {
  return await axios.post('/auth/register', registerForm);
};

export const logout = async () => {
  return await axios.get('/auth/logout');
};

export const refresh = async (refreshToken: string) => {
  const response = await axios.post<IAuthResponse>('/auth/refresh', {
    refresh_token: refreshToken,
  });
  return response.data;
};
