import { FC, ReactNode } from 'react';
import AuthContext from '~/core/contexts/AuthContext';
import { vi } from 'vitest';
import { mockUser } from '~/core/domains/users/users.mock';
import { ILoginForm, IRegisterForm } from '~/core/domains/auth/auth.type';
import { IUser } from '~/core/domains/users/users.type';

interface MockAuthProviderProps {
  login?: (loginForm: ILoginForm) => void;
  logout?: () => void;
  register?: (registerForm: IRegisterForm) => void;
  user?: IUser | null;
  isAuthenticated?: boolean;
  children: ReactNode;
}

const MockAuthProvider: FC<MockAuthProviderProps> = ({
  login = vi.fn(),
  logout = vi.fn(),
  register = vi.fn(),
  user = mockUser,
  isAuthenticated = false,
  children,
}) => {
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default MockAuthProvider;
