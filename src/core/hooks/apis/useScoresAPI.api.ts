import axios from 'axios';
import { IScore, IScoreResponse } from '~/core/domains/scores/scores.type';

export const useScoresAPI = () => {
  const postScores = async (score: IScore) => {
    return await axios.post('/scores', score);
  };

  const getScores = async () => {
    const response = await axios.get<IScoreResponse[]>('/scores');
    return response.data;
  };

  const getScoresRules = async () => {
    const response = await axios.get<Record<string, number>>('/scores/rules');
    return response.data;
  };

  const deleteScores = async () => {
    return await axios.delete('/scores');
  };

  return {
    postScores,
    getScores,
    getScoresRules,
    deleteScores,
  };
};
