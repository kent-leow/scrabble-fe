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
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '~/utils/constants/routes';
import AuthContext from '~/core/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { IRegisterForm } from '~/core/domains/auth/auth.type';
import CenteredCard from '~/components/templates/CenteredCard';
import { registerFormSchema } from '~/core/domains/auth/auth.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePasswordCheckHook } from '~/core/hooks/usePasswordCheck.hook';
import PasswordHelperText from '~/components/atoms/PasswordHelperText';

export default function RegisterPage() {
  const { register: authRegister } = useContext(AuthContext);
  const { push } = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IRegisterForm>({
    resolver: yupResolver<IRegisterForm>(registerFormSchema),
  });
  const {
    checkPasswordLength,
    checkPasswordLowercase,
    checkPasswordUppercase,
    checkPasswordNumber,
    checkPasswordSpecialCharacter,
  } = usePasswordCheckHook();

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
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password')}
          />
          {/* write a list of criteria, green if fulfilled */}
          <Stack spacing={1}>
            <Typography variant="body2">Password Criteria:</Typography>
            <PasswordHelperText
              tester={checkPasswordLength}
              value={watch('password')}
            >
              At least 8 characters
            </PasswordHelperText>
            <PasswordHelperText
              tester={checkPasswordLowercase}
              value={watch('password')}
            >
              At least one lowercase letter
            </PasswordHelperText>
            <PasswordHelperText
              tester={checkPasswordUppercase}
              value={watch('password')}
            >
              At least one uppercase letter
            </PasswordHelperText>
            <PasswordHelperText
              tester={checkPasswordNumber}
              value={watch('password')}
            >
              At least one number
            </PasswordHelperText>
            <PasswordHelperText
              tester={checkPasswordSpecialCharacter}
              value={watch('password')}
            >
              At least one special character
            </PasswordHelperText>
          </Stack>
          <TextField
            label="Confirm Password"
            variant="standard"
            type={showConfirmationPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowConfirmationPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showConfirmationPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
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
