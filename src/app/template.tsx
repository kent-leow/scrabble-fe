'use client';
import { ReactNode, useMemo } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import ResponsiveAppBar from '~/components/organisms/ResponsiveAppBar';
import AuthProvider from '~/core/providers/AuthProvider';
import { Stack, ThemeProvider } from '@mui/material';
import GlobalProvider from '~/core/providers/GlobalProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import theme from '~/utils/themes/theme';
import { useAxiosHook } from '~/core/hooks/useAxios.hook';
import { usePathname } from 'next/navigation';
import { PROTECTED_ROUTES } from '~/utils/constants/routes';
import ProtectedRoute from '~/components/templates/ProtectedPage';

const queryClient = new QueryClient();

export default function Template({ children }: { children: ReactNode }) {
  const [initAxios] = useAxiosHook();
  initAxios();
  const pathname = usePathname();

  const isRouteProtected = useMemo(
    () => PROTECTED_ROUTES.includes(pathname),
    [pathname],
  );

  const protectionWrappedChildren = useMemo(
    () =>
      isRouteProtected ? <ProtectedRoute>{children}</ProtectedRoute> : children,
    [isRouteProtected, children],
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <GlobalProvider>
            <ThemeProvider theme={theme}>
              <Stack height="100vh">
                <ResponsiveAppBar />
                <Stack flexGrow={1}>{protectionWrappedChildren}</Stack>
              </Stack>
            </ThemeProvider>
          </GlobalProvider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
