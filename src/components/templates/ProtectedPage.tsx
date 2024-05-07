import { useRouter } from 'next/navigation';
import { FC, ReactNode, useContext } from 'react';
import AuthContext from '~/core/contexts/AuthContext';
import { ROUTES } from '~/utils/constants/routes';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { replace } = useRouter();
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    replace(ROUTES.HOME);
    return null;
  }

  return children;
};

export default ProtectedRoute;
