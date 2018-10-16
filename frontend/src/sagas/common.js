import { call, put, takeLatest } from 'redux-saga/effects';
import ActionTypes, {
  GET_FEATURED_SCHOOLING_EVENTS_REQUEST
} from '../constants/actionTypes';

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

export function* takeLatestRequestStart(subtype, worker) {
  yield takeLatest(
    a => a.type === ActionTypes.ASYNC_START && a.subtype === subtype,
    worker
  );
}
