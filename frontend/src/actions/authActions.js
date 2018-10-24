import {
  POST_LOGIN_WITH_CREDENTIALS_REQUEST,
  LOGIN,
  LOGOUT
} from '../constants/actionTypes';
import { createAsyncAction, createAction } from './common';

export const postLoginWithCredentialsRequest = createAsyncAction(
  POST_LOGIN_WITH_CREDENTIALS_REQUEST
);

export const logout = () => createAction(LOGOUT);
export const login = (accessToken, tokenType) =>
  createAction(LOGIN, { accessToken, tokenType });

export default {
  postLoginWithCredentialsRequest,
  login,
  logout
};