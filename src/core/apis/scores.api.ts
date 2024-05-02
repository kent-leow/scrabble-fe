import axios from 'axios';
import { IScore, IScoreResponse } from '~/core/domains/scores/scores.type';

export const createScore = async (score: IScore) => {
  return await axios.post('/scores', score);
};

export const fetchScores = async () => {
  const response = await axios.get<IScoreResponse[]>('/scores');
  return response.data;
};

export const fetchScoringRules = async () => {
  const response = await axios.get<Record<string, number>>('/scores/rules');
  return response.data;
};
