import { all, fork } from 'redux-saga/effects';

import schoolingEventSagas from './schoolingEventSagas';
import authSagas from './authSagas';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(schoolingEventSagas), fork(authSagas)]);
}
