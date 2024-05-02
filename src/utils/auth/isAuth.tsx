'use client';
import { useContext, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { ROUTES } from '~/utils/constants/routes';
import AuthContext from '~/core/contexts/AuthContext';

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
      if (!isAuthenticated) {
        return redirect(ROUTES.HOME);
      }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}
