import { all, fork } from 'redux-saga/effects';

import schoolingEventSagas from './schoolingEventSagas';
import authSagas from './authSagas';
import formActionSaga from 'redux-form-saga';
import ticketSagas from './ticketSagas';
import notificationsSaga from './notificationsSaga';

/**
 * rootSaga
 */
export default function* root() {
  yield all([
    fork(schoolingEventSagas),
    fork(authSagas),
    fork(formActionSaga),
    fork(ticketSagas),
    fork(notificationsSaga)
  ]);
}
