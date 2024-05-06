export interface ILoginForm {
  username: string;
  password: string;
}

export interface IRegisterForm {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
}
