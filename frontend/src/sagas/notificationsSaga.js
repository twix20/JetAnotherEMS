import {
  all,
  call,
  put,
  takeLatest,
  select,
  takeEvery
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import schoolingEventActions from '../actions/schoolingEventActions';
import notificationActions from '../actions/notificationActions';

function* saveSchoolingEventNotifications(action) {
  console.log(action);

  if (
    action.type === schoolingEventActions.createOrUpdateSchoolingEvent.SUCCESS
  ) {
    yield put(
      notificationActions.success({
        title: 'Save Schooling Event',
        message: 'Succesffuly saved schooling event'
      })
    );
  } else {
    yield put(
      notificationActions.error({
        title: 'Save Schooling Event',
        message: 'Error while saving schooling event'
      })
    );
  }
}

export default function* root() {
  yield all([
    takeEvery(
      [
        schoolingEventActions.createOrUpdateSchoolingEvent.SUCCESS,
        schoolingEventActions.createOrUpdateSchoolingEvent.FAILURE
      ],
      saveSchoolingEventNotifications
    )
  ]);
}
