import * as yup from 'yup';
import { IRegisterForm } from '~/core/domains/auth/auth.type';

export const registerFormSchema: yup.ObjectSchema<IRegisterForm> = yup
  .object()
  .shape({
    username: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), ''], 'Passwords must match')
      .required(),
  });
