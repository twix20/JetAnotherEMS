import { all, fork } from 'redux-saga/effects';

import schoolingEventSagas from './schoolingEventSagas';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(schoolingEventSagas)]);
}
