import {
  all,
  call,
  put,
  takeLatest,
  select,
  takeEvery,
  fork
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { SubmissionError } from 'redux-form';
import ActionTypes, {
  GET_MORE_SCHOOLING_EVENTS,
  LOGOUT
} from '../constants/actionTypes';
import { sagaRequestWrapper } from './common';
import api from '../services/api';
import schoolingEventActions from '../actions/schoolingEventActions';
import {
  schoolingEventFilterSelectors,
  schoolingEventSelectors
} from '../reducers/selectors';
import ticketActions from '../actions/ticketActions';
import authActions from '../actions/authActions';
import { initialize } from 'redux-form';
import moment from 'moment';
import { push } from 'react-router-redux';
import { fetchTicketForEvent } from './ticketSagas';

export function* fetchMoreFeaturedEventsWithAppliedFilter(action) {
  const filter = yield select(schoolingEventFilterSelectors.filter);

  //todo: save and take page from reducer
  const data = {
    page: 0,
    pageSize: 20000,
    sort: filter.sort,
    DateStart: filter.dateStart ? filter.dateStart.format() : null,
    DateEnd: filter.dateEnd ? filter.dateEnd.format() : null,
    PriceFrom: filter.priceFrom,
    PriceTo: filter.priceTo,
    OnlyFavorites: filter.onlyFavorites,
    OnlyPrivate: filter.onlyPrivate,
    OnlyMy: filter.onlyMy
  };

  yield put(
    schoolingEventActions.getFeaturedSchoolingEventsRequest.start(data)
  );

  const { response, error } = yield sagaRequestWrapper(
    schoolingEventActions.getFeaturedSchoolingEventsRequest,
    api.schoolingEvent.getFeaturedEvents,
    data
  );
}

export function* handleChangeSchoolingEventFollowSaga(action) {
  const { eventId, newFollowStatus } = action;

  const { response, error } = yield sagaRequestWrapper(
    schoolingEventActions.changeSchoolingEventFollow,
    api.schoolingEvent.changeSchoolingEventFollow,
    {
      eventId,
      newFollowStatus
    }
  );
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

  return response;
}

export function* fetchSchoolingEventSchedule(action) {
  const { id } = action;

  const { response, error } = yield sagaRequestWrapper(
    schoolingEventActions.getScheduleRequst,
    api.schoolingEvent.getSchedule,
    { id }
  );

  return response;
}

export function* fetchSchoolingEventParticipants(action) {
  const { eventId } = action;

  const { response, error } = yield sagaRequestWrapper(
    schoolingEventActions.getEventParticipantsRequest,
    api.schoolingEvent.getParticipants,
    { id: eventId }
  );

  return response;
}

export function* fetchEventAvailableTicketsSaga(action) {
  const { id } = action;

  const { response, error } = yield sagaRequestWrapper(
    schoolingEventActions.getEventAvailableTicketsRequest,
    api.schoolingEvent.getAvailableTickets,
    { id }
  );

  return response;
}

export function* handleCreateOrUpdateSchoolingEvent(action) {
  let {
    id,
    isPublic,
    eventTitle: title,
    description,
    location,
    calendar,
    tickets,
    gallery
  } = action.payload;

  const shouldCreate = !id;
  const request = shouldCreate
    ? schoolingEventActions.createSchoolingEventRequest
    : schoolingEventActions.updateSchoolingEventRequest;
  const apiAction = shouldCreate
    ? api.schoolingEvent.create
    : api.schoolingEvent.update;

  if (calendar) {
    calendar
      .filter(day => day.attachments)
      .map(day => day.attachments)
      .forEach(dayAttachments => {
        dayAttachments.forEach(a => {
          a.id = a.serverId;
        });
      });
  }

  if (gallery) {
    gallery = gallery.map(g => {
      return {
        id: g.serverId,
        serverId: g.serverId,
        name: g.name,
        size: g.size,
        type: g.type,
        origin: 'local'
      };
    });
  }

  const { response, error } = yield sagaRequestWrapper(request, apiAction, {
    id,
    isPublic,
    title,
    description,
    location,
    calendar,
    tickets,
    gallery
  });

  if (error) {
    const formError = new SubmissionError({
      //TODO: provide correct error messages / notifications
      login: 'Uaaaaaaaaaaaaaaaa', // specific field error
      _error: 'Login failed, please check your credentials and try again' // global form error
    });
    yield put(
      schoolingEventActions.createOrUpdateSchoolingEvent.failure(formError)
    );
  } else {
    yield put(
      schoolingEventActions.createOrUpdateSchoolingEvent.success(error)
    );

    yield put(schoolingEventActions.openCreatorDialog(false));
    yield put(push(`/event/${response.data.data.id}`));
  }
}

export function* handleLoadEventCreatorInitialValues(action) {
  const { eventId } = action;

  try {
    const { eventResponse, calendarResponse, ticketsResponse } = yield all({
      eventResponse: call(fetchSchoolingEvent, { id: eventId }),
      calendarResponse: call(fetchSchoolingEventSchedule, { id: eventId }),
      ticketsResponse: call(fetchEventAvailableTicketsSaga, { id: eventId })
    });

    if (
      eventResponse == undefined ||
      calendarResponse == undefined ||
      ticketsResponse == undefined
    ) {
      throw 'Something went wrong while fetching event from';
    }

    const event = eventResponse.data.data;
    const calendar = calendarResponse.data.data;
    const tickets = ticketsResponse.data.data;

    //Set form values
    const initialVal = {
      id: event.id,
      isPublic: event.isPublic,
      eventTitle: event.title,
      location: event.location,
      description: event.description,
      tickets: tickets.map(t => ({
        id: t.id,
        currency: t.currency,
        totalQuantity: t.totalQuantity,
        usersBoughtThisTicket: t.usersBoughtThisTicket,
        name: t.name,
        price: t.price
      })),
      calendar: calendar.map(d => ({
        id: d.id,
        title: d.title,
        description: d.description,
        lectureRoom: d.lectureRoom,
        teacher: d.teacher,
        dateStart: moment(d.start),
        dateEnd: moment(d.end),
        start: moment(d.start).toDate(),
        end: moment(d.end).toDate(),
        bgColor: '#ff7f50',
        attachments: d.attachments.map(a => ({
          id: a.id,
          serverId: a.id,
          name: a.originalName,
          size: a.size,
          type: a.type,
          origin: 'local'
        })),
        tags: d.tags.map(t => ({
          description: t.description,
          label: t.value,
          value: t.value
        }))
      })),
      gallery: event.gallery.map(g => ({
        id: g.id,
        serverId: g.id,
        name: g.originalName,
        size: g.size,
        type: g.type,
        origin: 'local'
      }))
    };

    yield put(initialize('eventCreatorFrom', initialVal));

    yield put(
      schoolingEventActions.loadEventCreatorInitialValues.success({
        ...event,
        calendar,
        tickets
      })
    );
  } catch (error) {
    yield put(
      schoolingEventActions.loadEventCreatorInitialValues.failure(error)
    );
  }
}

function* handleUserChanged(action) {
  //Reload schooling event if user loged in or loged out

  yield fork(fetchMoreFeaturedEventsWithAppliedFilter);

  const allEventsInState = yield select(schoolingEventSelectors.events);
  for (const event of allEventsInState) {
    yield fork(fetchSchoolingEvent, { id: event.id });
    yield fork(fetchTicketForEvent, { eventId: event.id });
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
        ticketActions.changeTicketsSatusForEventRequest.SUCCESS
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
    ),
    takeEvery(
      schoolingEventActions.loadEventCreatorInitialValues.START,
      handleLoadEventCreatorInitialValues
    ),
    takeLatest(
      schoolingEventActions.changeSchoolingEventFollow.START,
      handleChangeSchoolingEventFollowSaga
    ),
    takeEvery([authActions.login.SUCCESS, LOGOUT], handleUserChanged)
  ]);
}
