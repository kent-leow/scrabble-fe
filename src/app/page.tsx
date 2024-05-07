'use client';
import { Button, Stack } from '@mui/material';
import { ROUTES } from '~/utils/constants/routes';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import AuthContext from '~/core/contexts/AuthContext';
import HomePage from '~/app/HomePage';
import CenteredCard from '~/components/templates/CenteredCard';
import Typography from '@mui/material/Typography';

export default function Home() {
  const { push } = useRouter();
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <HomePage />;
  }

  return (
    <CenteredCard>
      <Stack spacing={4}>
        <Typography variant="h4">Welcome!</Typography>
        <Stack spacing={2} mt="40px !important" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => push(ROUTES.LOGIN)}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => push(ROUTES.REGISTER)}
          >
            Register
          </Button>
        </Stack>
      </Stack>
    </CenteredCard>
  );
}
