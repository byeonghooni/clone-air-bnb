import axios from '.';
import { UserType } from '../../types/user';

interface SignUpAPIBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  birthday: string;
}

export const signupAPI = (body: SignUpAPIBody) =>
  axios.post('/api/auth/signup', body);

export const loginAPI = (body: { email: string; password: string }) =>
  axios.post<UserType>('/api/auth/login', body);
