export interface IScore {
  string: string;
  score: number;
}

export interface IScoreResponse extends IScore {
  _id: string;
  user: string;
}
