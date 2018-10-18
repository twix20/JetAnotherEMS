import { call, put, takeLatest } from 'redux-saga/effects';
import ActionTypes from '../constants/actionTypes';

export function* sagaRequestWrapper(requestActionTypes, apiCall, apiCallArgs) {
  try {
    const response = yield call(apiCall, apiCallArgs);
    yield put(requestActionTypes.success({ response, ...apiCallArgs }));
    return { response, apiCallArgs };
  } catch (error) {
    yield put(requestActionTypes.failure({ error, ...apiCallArgs }));
    return { error, apiCallArgs };
  }
}
