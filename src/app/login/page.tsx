'use client';
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { MouseEvent, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '~/utils/constants/routes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILoginForm } from '~/core/domains/auth/auth.type';
import AuthContext from '~/core/contexts/AuthContext';
import CenteredCard from '~/components/templates/CenteredCard';

export default function LoginPage() {
  const { push } = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm<ILoginForm>();
  const { login } = useContext(AuthContext);

  const onSubmit: SubmitHandler<ILoginForm> = (data) => login(data);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <CenteredCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Typography variant="h4">Login</Typography>
          <TextField
            fullWidth
            label="Username"
            variant="standard"
            {...register('username')}
          />
          <TextField
            label="Password"
            variant="standard"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register('password')}
          />
          <Stack sx={{ mt: '40px !important' }} spacing={2}>
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => push(ROUTES.HOME)}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </CenteredCard>
  );
}
