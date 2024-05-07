'use client';

import React, { ReactNode, useEffect, useMemo } from 'react';
import AuthContext from '~/core/contexts/AuthContext';
import { ILoginForm, IRegisterForm } from '~/core/domains/auth/auth.type';
import { ROUTES } from '~/utils/constants/routes';
import { useRouter } from 'next/navigation';
import { IUser } from '~/core/domains/users/users.type';
import { useLocalStorage } from '@uidotdev/usehooks';
import { LOCAL_STORAGE_KEYS } from '~/utils/constants/localStorageKeys';
import { useUsersAPI } from '~/core/hooks/apis/useUsersAPI.hook';
import { useAuthAPI } from '~/core/hooks/apis/useAuthAPI.hook';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '~/utils/constants/queryKeys';
import { APP_CONFIG } from '~/utils/constants/appConfig';
import { promiseWithToast } from '~/utils/helpers/general.helper';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const { getUsersMe } = useUsersAPI();
  const { postAuthLogin, postAuthRegister, getAuthLogout } = useAuthAPI();
  const [user, setUser] = React.useState<IUser | null>(null);
  const [token, setToken] = useLocalStorage<string | undefined>(
    LOCAL_STORAGE_KEYS.TOKEN,
  );
  const [_refreshToken, setRefreshToken] = useLocalStorage<string | undefined>(
    LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
  );
  const queryClient = useQueryClient();

  const isAuthenticated = useMemo(() => !!token, [token]);

  const { data: meData } = useQuery({
    queryKey: [QUERY_KEYS.GET_ME],
    queryFn: getUsersMe,
    enabled: isAuthenticated,
    staleTime: APP_CONFIG.STALE_TIME,
  });

  useEffect(() => {
    setUser(meData ?? null);
  }, [meData]);

  const login = async (loginForm: ILoginForm) => {
    await promiseWithToast(async () => {
      const authResponse = await postAuthLogin(loginForm);
      setToken(authResponse.accessToken);
      setRefreshToken(authResponse.refreshToken);
      router.push(ROUTES.HOME);
    }, 'Login successful');
  };

  const register = async (registerForm: IRegisterForm) => {
    await promiseWithToast(async () => {
      await postAuthRegister(registerForm);
      router.push(ROUTES.HOME);
    }, 'Registration successful');
  };

  const logout = async () => {
    await promiseWithToast(async () => {
      await getAuthLogout();
      queryClient.clear();
      setToken(undefined);
      setRefreshToken(undefined);
      setUser(null);
      router.push(ROUTES.HOME);
    }, 'Logout successful');
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
        user,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
