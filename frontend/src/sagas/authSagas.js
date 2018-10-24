import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { sagaRequestWrapper } from './common';
import api from '../services/api';
import authActions from '../actions/authActions';

export function* loginWithCredentials(action) {
  console.log(action);

  const { email, password, rememberMe } = action;

  const { response, error } = yield sagaRequestWrapper(
    authActions.postLoginWithCredentialsRequest,
    api.account.postLogin,
    { email, password, rememberMe }
  );

  if (response) {
    const {
      access_token: accessToken,
      token_type: tokenType
    } = response.data.data;

    yield put(authActions.login(accessToken, tokenType));
  }
}

export default function* root() {
  yield all([
    takeLatest(
      authActions.postLoginWithCredentialsRequest.types.start,
      loginWithCredentials
    )
  ]);
}
