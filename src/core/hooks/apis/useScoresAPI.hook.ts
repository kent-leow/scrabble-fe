import axios from 'axios';
import { IScore, IScoreResponse } from '~/core/domains/scores/scores.type';

export const useScoresAPI = () => {
  const createScore = async (score: IScore) => {
    return await axios.post('/scores', score);
  };

  const fetchScores = async () => {
    const response = await axios.get<IScoreResponse[]>('/scores');
    return response.data;
  };

  const fetchScoringRules = async () => {
    const response = await axios.get<Record<string, number>>('/scores/rules');
    return response.data;
  };

  return {
    createScore,
    fetchScores,
    fetchScoringRules,
  };
};
