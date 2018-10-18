import { all, call, put, takeLatest } from 'redux-saga/effects';
import ActionTypes, {
  GET_FEATURED_SCHOOLING_EVENTS_REQUEST,
  GET_SCHOOLING_EVENT_REQUEST,
  GET_SCHOOLING_EVENT_SCHEDULE_REQUEST
} from '../constants/actionTypes';
import { sagaRequestWrapper } from './common';
import api from '../services/api';
import schoolingEventActions from '../actions/schoolingEventActions';

export function* fetchFeaturedEvents(action) {
  const { page, pageSize } = action;

  const { response, error } = yield sagaRequestWrapper(
    schoolingEventActions.getFeaturedSchoolingEventsRequest,
    api.schoolingEvent.getFeaturedEvents,
    { page, pageSize }
  );
  console.log(response);
}

export function* fetchSchoolingEvent(action) {
  const { id } = action;

  const { response, error } = yield sagaRequestWrapper(
    schoolingEventActions.getEventRequest,
    api.schoolingEvent.getEvent,
    { id }
  );
  console.log(response);
}

export function* fetchSchoolingEventSchedule(action) {
  const { id } = action;

  const { response, error } = yield sagaRequestWrapper(
    schoolingEventActions.getScheduleRequst,
    api.schoolingEvent.getSchedule,
    { id }
  );
  console.log(response);
}

export default function* root() {
  yield all([
    takeLatest(
      schoolingEventActions.getFeaturedSchoolingEventsRequest.types.start,
      fetchFeaturedEvents
    ),
    takeLatest(
      schoolingEventActions.getEventRequest.types.start,
      fetchSchoolingEvent
    ),
    takeLatest(
      schoolingEventActions.getScheduleRequst.types.start,
      fetchSchoolingEventSchedule
    )
  ]);
}
