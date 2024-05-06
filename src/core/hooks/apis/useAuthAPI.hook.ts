import axios from 'axios';
import {
  IAuthResponse,
  ILoginForm,
  IRegisterForm,
} from '~/core/domains/auth/auth.type';

export const useAuthAPI = () => {
  const login = async (loginForm: ILoginForm) => {
    const response = await axios.post<IAuthResponse>('/auth/login', loginForm);
    return response.data;
  };

  const register = async (registerForm: IRegisterForm) => {
    return await axios.post('/auth/register', {
      ...registerForm,
      confirmPassword: undefined,
    });
  };

  const logout = async () => {
    return await axios.get('/auth/logout');
  };

  const refresh = async (refreshToken: string) => {
    const response = await axios.post<IAuthResponse>('/auth/refresh', {
      refresh_token: refreshToken,
    });
    return response.data;
  };
  return {
    login,
    register,
    logout,
    refresh,
  };
};
