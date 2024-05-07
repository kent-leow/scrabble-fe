import { REGEXES } from '~/utils/constants/regexes';

export const usePasswordCheckHook = () => {
  const checkPassword = (password: string) => {
    const regex = REGEXES.PASSWORD;
    return regex.test(password);
  };

  const checkPasswordLength = (password: string = '') => {
    return password.length >= 8;
  };

  const checkPasswordUppercase = (password: string = '') => {
    return REGEXES.UPPER_CASE.test(password);
  };

  const checkPasswordLowercase = (password: string = '') => {
    return REGEXES.LOWER_CASE.test(password);
  };

  const checkPasswordNumber = (password: string = '') => {
    return REGEXES.NUMBER.test(password);
  };

  const checkPasswordSpecialCharacter = (password: string = '') => {
    return REGEXES.SPECIAL_CHARACTER.test(password);
  };

  return {
    checkPassword,
    checkPasswordLength,
    checkPasswordUppercase,
    checkPasswordLowercase,
    checkPasswordNumber,
    checkPasswordSpecialCharacter,
  };
};
