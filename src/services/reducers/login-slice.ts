import { TUser } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';

interface LoginState {
  isAuthenticating: boolean;
  isLoggedIn: boolean;
  user?: TUser;
}

const initialState: LoginState = {
  isAuthenticating: false,
  isLoggedIn: false
};

export const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
});
