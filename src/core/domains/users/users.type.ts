import { Role } from '~/core/domains/users/users.enum';

export interface IUser {
  id: number;
  username: string;
  role: Role;
}
