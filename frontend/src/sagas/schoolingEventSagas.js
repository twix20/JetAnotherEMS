import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import ActionTypes, {
  GET_FEATURED_SCHOOLING_EVENTS_REQUEST,
  GET_SCHOOLING_EVENT_REQUEST,
  GET_SCHOOLING_EVENT_SCHEDULE_REQUEST,
  GET_MORE_SCHOOLING_EVENTS
} from '../constants/actionTypes';
import { sagaRequestWrapper } from './common';
import api from '../services/api';
import schoolingEventActions from '../actions/schoolingEventActions';
import { schoolingEventFilterSelectors } from '../reducers/selectors';

export function* fetchMoreFeaturedEventsWithAppliedFilter(action) {
  //todo: save and take page from reducer
  const data = {
    page: 0,
    pageSize: 20
  };

  yield put(
    schoolingEventActions.getFeaturedSchoolingEventsRequest.start(data)
  );

  const filter = yield select(schoolingEventFilterSelectors.filter);

  console.log(filter);

  const { response, error } = yield sagaRequestWrapper(
    schoolingEventActions.getFeaturedSchoolingEventsRequest,
    api.schoolingEvent.getFeaturedEvents,
    data
  );
  console.log(response);
}

export function* debouncedFetchFeaturedEventsWithAppliedFilter(action) {
  yield call(delay, 200);

  yield call(fetchMoreFeaturedEventsWithAppliedFilter, action);
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
      GET_MORE_SCHOOLING_EVENTS,
      fetchMoreFeaturedEventsWithAppliedFilter
    ),
    takeLatest(
      schoolingEventActions.getEventRequest.types.start,
      fetchSchoolingEvent
    ),
    takeLatest(
      schoolingEventActions.getScheduleRequst.types.start,
      fetchSchoolingEventSchedule
    ),
    takeLatest(
      ActionTypes.UPDATE_SCHOOLING_EVENT_FILTER,
      debouncedFetchFeaturedEventsWithAppliedFilter
    )
  ]);
}
