import { IUser } from '~/core/domains/users/users.type';

export interface IScore {
  string: string;
  score: number;
}

export interface IScoreResponse extends IScore {
  _id: string;
  user: IUser;
}
