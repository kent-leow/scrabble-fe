import { IUser } from '~/core/domains/users/users.type';
import { Role } from '~/core/domains/users/users.enum';

export const mockUser: IUser = { role: Role.USER, username: 'test', id: 1 };
