import { call, put } from 'redux-saga/effects';

export function* sagaRequestWrapper(requestActionTypes, apiCall, apiCallArgs) {
  try {
    const response = yield call(apiCall, ...apiCallArgs);
    yield put(requestActionTypes.success(response));
    return { response };
  } catch (error) {
    yield put(requestActionTypes.failure(error));
    return { error };
  }
}
