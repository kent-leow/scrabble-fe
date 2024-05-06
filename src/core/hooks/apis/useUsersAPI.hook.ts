import axios from 'axios';
import { IUser } from '~/core/domains/users/users.type';

export const useUsersAPI = () => {
  const getMe = async () => {
    const response = await axios.get<IUser>('/users/me');
    return response.data;
  };

  return {
    getMe,
  };
};
