import { UserState } from '../types/reduxState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../types/user';

const initialState: UserState = {
  id: 0,
  email: '',
  lastName: '',
  firstName: '',
  birthday: '',
  isLogged: false,
  profileImage: '',
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedUser(state, action: PayloadAction<UserType>) {
      return {
        ...action.payload,
        isLogged: true,
      };
    },
  },
});

export const userActions = { ...user.actions };

export default user;
