import * as yup from 'yup';
import { IRegisterForm } from '~/core/domains/auth/auth.type';
import { REGEXES } from '~/utils/constants/regexes';

export const registerFormSchema: yup.ObjectSchema<IRegisterForm> = yup
  .object()
  .shape({
    username: yup.string().required(),
    password: yup
      .string()
      .required()
      .matches(REGEXES.PASSWORD, 'Password not strong enough'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), ''], 'Passwords must match')
      .required(),
  });
