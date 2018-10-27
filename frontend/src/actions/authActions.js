import {
  POST_LOGIN_WITH_CREDENTIALS_REQUEST,
  POST_REGISTER_WITH_CREDENTIALS_REQUEST,
  LOGIN,
  REGISTER_WITH_CREDENTIALS,
  LOGOUT
} from '../constants/actionTypes';
import { createAsyncAction, createAction } from './common';
import { createFormAction } from 'redux-form-saga';

export const postLoginWithCredentialsRequest = createAsyncAction(
  POST_LOGIN_WITH_CREDENTIALS_REQUEST
);
export const postRegisterWithCredentialsRequest = createAsyncAction(
  POST_REGISTER_WITH_CREDENTIALS_REQUEST
);

export const logout = () => createAction(LOGOUT);
export const login = createFormAction(LOGIN);
export const registerWithCredentials = createFormAction(
  REGISTER_WITH_CREDENTIALS
);

export default {
  postLoginWithCredentialsRequest,
  postRegisterWithCredentialsRequest,
  login,
  registerWithCredentials,
  logout
};
