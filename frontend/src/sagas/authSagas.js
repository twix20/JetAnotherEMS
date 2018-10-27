import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { SubmissionError } from 'redux-form';
import { sagaRequestWrapper } from './common';
import api from '../services/api';
import authActions from '../actions/authActions';
import { registerWithCredentials } from './../actions/authActions';

export function* handleRegisterWithCredentials(action) {
  const { email, password, confirmPassword, account } = action.payload;

  const { response, error } = yield sagaRequestWrapper(
    authActions.postRegisterWithCredentialsRequest,
    api.account.postRegister,
    { email, password, confirmPassword, account }
  );

  if (response) {
    yield put(authActions.registerWithCredentials.success());
    yield call(handleLoginSaga, {
      payload: {
        email,
        password,
        rememberMe: true
      }
    });
  } else if (error) {
    const formError = new SubmissionError({
      email: 'User with given email already exists', // specific field error
      _error: 'Registration failed' // global form error
    });

    yield put(authActions.registerWithCredentials.failure(formError));
  }
}

function* handleLoginSaga(action) {
  const { email, password, rememberMe } = action.payload;

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

    const payload = {
      accessToken,
      tokenType
    };

    yield put(authActions.login.success(payload));
  } else if (error) {
    const formError = new SubmissionError({
      email: 'User with this email is not found', // specific field error
      _error: 'Login failed, please check your credentials and try again' // global form error
    });

    yield put(authActions.login.failure(formError));
  }
}

export default function* root() {
  yield all([
    takeLatest(authActions.login.REQUEST, handleLoginSaga),
    takeLatest(
      authActions.registerWithCredentials.REQUEST,
      handleRegisterWithCredentials
    )
  ]);
}
