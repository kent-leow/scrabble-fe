import axios from 'axios';
import {
  IAuthResponse,
  ILoginForm,
  IRegisterForm,
} from '~/core/domains/auth/auth.type';

export const useAuthAPI = () => {
  const postAuthLogin = async (loginForm: ILoginForm) => {
    const response = await axios.post<IAuthResponse>('/auth/login', loginForm);
    return response.data;
  };

  const postAuthRegister = async (registerForm: IRegisterForm) => {
    return await axios.post('/auth/register', {
      ...registerForm,
      confirmPassword: undefined,
    });
  };

  const getAuthLogout = async () => {
    return await axios.get('/auth/logout');
  };

  const postAuthRefresh = async (refreshToken: string) => {
    const response = await axios.post<IAuthResponse>('/auth/refresh', {
      refreshToken: refreshToken,
    });
    return response.data;
  };
  return {
    postAuthLogin,
    postAuthRegister,
    getAuthLogout,
    postAuthRefresh,
  };
};
