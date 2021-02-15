import axios from '.';

interface SignUpAPIBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  birthday: string;
}

export const signupAPI = (body: SignUpAPIBody) =>
  axios.post('/api/auth/signup', body);
