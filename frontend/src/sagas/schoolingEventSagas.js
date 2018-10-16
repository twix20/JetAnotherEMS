import { all, call, put, takeLatest } from 'redux-saga/effects';
import ActionTypes, {
  GET_FEATURED_SCHOOLING_EVENTS_REQUEST
} from '../constants/actionTypes';
import { sagaRequestWrapper } from './common';
import api from '../services/api';
import schoolingEventActions from '../actions/schoolingEventActions';

export function* getFeaturedEvents(action) {
  if (action.subtype !== GET_FEATURED_SCHOOLING_EVENTS_REQUEST) return;

  const { page, pageSize } = action;

  const { response } = yield sagaRequestWrapper(
    schoolingEventActions.getFeaturedSchoolingEventsRequest,
    api.schoolingEvent.getFeaturedEvents,
    { page, pageSize }
  );
  console.log(response);
}

export default function* root() {
  yield all([takeLatest(ActionTypes.ASYNC_START, getFeaturedEvents)]);
}
