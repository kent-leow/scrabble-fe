import { createContext } from 'react';
import { ILoginForm, IRegisterForm } from '~/core/domains/auth/auth.type';
import { IUser } from '~/core/domains/users/users.type';

export interface AuthContextProps {
  login: (loginForm: ILoginForm) => void;
  logout: () => void;
  register: (registerForm: IRegisterForm) => void;
  user: IUser | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  login: () => {},
  logout: () => {},
  register: () => {},
  user: null,
  isAuthenticated: false,
});

export default AuthContext;
