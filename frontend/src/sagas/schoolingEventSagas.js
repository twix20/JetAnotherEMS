import {
  all,
  call,
  put,
  takeLatest,
  select,
  takeEvery
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { SubmissionError } from 'redux-form';
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
import ticketActions from '../actions/ticketActions';

export function* fetchMoreFeaturedEventsWithAppliedFilter(action) {
  const filter = yield select(schoolingEventFilterSelectors.filter);

  //todo: save and take page from reducer
  const data = {
    page: 0,
    pageSize: 20,
    DateFrom: filter.date.start ? filter.date.start.format() : null,
    DateTo: filter.date.to ? filter.date.to.format() : null,
    PriceFrom: filter.price.start,
    PriceTo: filter.price.to,
    OnlyFavorites: filter.toggleable.onlyFavorites,
    OnlyOngoing: filter.toggleable.onlyOngoing
  };

  yield put(
    schoolingEventActions.getFeaturedSchoolingEventsRequest.start(data)
  );

  //TODO: apply filter

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

export function* fetchSchoolingEventParticipants(action) {
  const { eventId } = action;

  const { response, error } = yield sagaRequestWrapper(
    schoolingEventActions.getEventParticipantsRequest,
    api.schoolingEvent.getParticipants,
    { id: eventId }
  );
  console.log(response);
}

export function* fetchEventAvailableTicketsSaga(action) {
  const { id } = action;

  const { response, error } = yield sagaRequestWrapper(
    schoolingEventActions.getEventAvailableTicketsRequest,
    api.schoolingEvent.getAvailableTickets,
    { id }
  );

  console.log(response);
}

export function* handleCreateOrUpdateSchoolingEvent(action) {
  let {
    id,
    eventTitle: title,
    description,
    location,
    calendar,
    tickets
  } = action.payload;

  const shouldCreate = !id;
  const request = shouldCreate
    ? schoolingEventActions.createSchoolingEventRequest
    : schoolingEventActions.updateSchoolingEventRequest;
  const apiAction = shouldCreate
    ? api.schoolingEvent.create
    : api.schoolingEvent.update;

  calendar
    .filter(day => day.attachments)
    .map(day => day.attachments)
    .forEach(dayAttachments => {
      dayAttachments.forEach(a => {
        a.id = a.serverId;
      });
    });

  const { response, error } = yield sagaRequestWrapper(request, apiAction, {
    id,
    title,
    description,
    location,
    calendar,
    tickets
  });

  if (error) {
    const formError = new SubmissionError({
      login: 'User with this login is not found', // specific field error
      _error: 'Login failed, please check your credentials and try again' // global form error
    });
    yield put(
      schoolingEventActions.createOrUpdateSchoolingEvent.failure(formError)
    );
  } else {
    yield put(
      schoolingEventActions.createOrUpdateSchoolingEvent.success(error)
    );
  }
}

export default function* root() {
  yield all([
    takeLatest(
      GET_MORE_SCHOOLING_EVENTS,
      fetchMoreFeaturedEventsWithAppliedFilter
    ),
    takeLatest(
      schoolingEventActions.getEventRequest.START,
      fetchSchoolingEvent
    ),
    takeLatest(
      schoolingEventActions.getScheduleRequst.START,
      fetchSchoolingEventSchedule
    ),
    takeLatest(
      [
        schoolingEventActions.getEventParticipantsRequest.START,
        ticketActions.approveTicketsForEventRequest.SUCCESS,
        ticketActions.rejectTicketsForEventRequest.SUCCESS
      ],
      fetchSchoolingEventParticipants
    ),
    takeLatest(
      ActionTypes.UPDATE_SCHOOLING_EVENT_FILTER,
      debouncedFetchFeaturedEventsWithAppliedFilter
    ),
    takeLatest(
      schoolingEventActions.getEventAvailableTicketsRequest.START,
      fetchEventAvailableTicketsSaga
    ),
    takeEvery(
      schoolingEventActions.createOrUpdateSchoolingEvent.REQUEST,
      handleCreateOrUpdateSchoolingEvent
    )
  ]);
}
