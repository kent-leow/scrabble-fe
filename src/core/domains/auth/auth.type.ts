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
  access_token: string;
  refresh_token: string;
}
