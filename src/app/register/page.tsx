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
import AuthContext from '~/core/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { IRegisterForm } from '~/core/domains/auth/auth.type';
import CenteredCard from '~/components/templates/CenteredCard';
import { registerFormSchema } from '~/core/domains/auth/auth.schema';
import { yupResolver } from '@hookform/resolvers/yup';

export default function RegisterPage() {
  const { register: authRegister } = useContext(AuthContext);
  const { push } = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    resolver: yupResolver<IRegisterForm>(registerFormSchema),
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <CenteredCard>
      <form onSubmit={handleSubmit(authRegister)}>
        <Stack spacing={2}>
          <Typography variant="h4">Register</Typography>
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
          <TextField
            label="Confirm Password"
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
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
          <Stack sx={{ mt: '40px !important' }} spacing={2}>
            <Button variant="contained" color="primary" type="submit">
              Register
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
