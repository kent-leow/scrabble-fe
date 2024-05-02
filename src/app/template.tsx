'use client';
import { ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { initAxios } from '~/utils/auth/auth';
import ResponsiveAppBar from '~/components/organisms/ResponsiveAppBar';
import AuthProvider from '~/core/providers/AuthProvider';
import { Stack } from '@mui/material';
import GlobalProvider from '~/core/providers/GlobalProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

initAxios();
const queryClient = new QueryClient();

export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <GlobalProvider>
            <Stack height="100vh">
              <ResponsiveAppBar />
              <Stack flexGrow={1}>{children}</Stack>
            </Stack>
          </GlobalProvider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
