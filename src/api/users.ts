import axios from 'axios';
import type User from 'types/User';

const API_GET_USERS = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get(API_GET_USERS);
  return response.data;
};
