'use client';

import React, { ReactNode, useEffect, useMemo } from 'react';
import AuthContext from '~/core/contexts/AuthContext';
import { ILoginForm, IRegisterForm } from '~/core/domains/auth/auth.type';
import { ROUTES } from '~/utils/constants/routes';
import { isAxiosError } from 'axios';
import {
  login as authLogin,
  logout as authLogout,
  register as authRegister,
} from '~/core/apis/auth.api';
import { useRouter } from 'next/navigation';
import { IUser } from '~/core/domains/users/users.type';
import { useLocalStorage } from '@uidotdev/usehooks';
import { LOCAL_STORAGE_KEYS } from '~/utils/constants/localStorageKeys';
import { getMe } from '~/core/apis/users.api';
import { displayErrorToast, displaySuccessToast } from '~/utils/helpers/toast';
import { useAxios } from '~/core/hooks/useAxios';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const initAxios = useAxios();
  const router = useRouter();
  const [user, setUser] = React.useState<IUser | null>(null);
  const [token, setToken] = useLocalStorage<string | undefined>(
    LOCAL_STORAGE_KEYS.TOKEN,
  );
  const [_, setRefreshToken] = useLocalStorage<string | undefined>(
    LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
  );

  const isAuthenticated = useMemo(() => !!token, [token]);

  useEffect(() => {
    if (!token) return;
    const fetchUser = async () => {
      try {
        const user = await getMe();
        setUser(user);
      } catch (e: unknown) {
        if (isAxiosError(e)) {
          displayErrorToast(e);
        }
      }
    };
    fetchUser();
  }, [token]);

  const login = async (loginForm: ILoginForm) => {
    try {
      const authResponse = await authLogin(loginForm);
      displaySuccessToast('Login successful');
      setToken(authResponse.access_token);
      setRefreshToken(authResponse.refresh_token);
      initAxios();
      router.push(ROUTES.HOME);
    } catch (e: unknown) {
      displayErrorToast(e);
    }
  };

  const register = async (registerForm: IRegisterForm) => {
    try {
      await authRegister(registerForm);
      displaySuccessToast('Registration successful');
      router.push(ROUTES.HOME);
    } catch (e: unknown) {
      displayErrorToast(e);
    }
  };

  const logout = async () => {
    try {
      await authLogout();
      setToken(undefined);
      setUser(null);
      displaySuccessToast('Logout successful');
      router.push(ROUTES.HOME);
    } catch (e: unknown) {
      displayErrorToast(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, register, user, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
