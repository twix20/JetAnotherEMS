import {
  all,
  call,
  put,
  takeLatest,
  select,
  takeEvery
} from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { sagaRequestWrapper } from './common';
import api from '../services/api';
import ticketActions from '../actions/ticketActions';

export function* fetchTicketForEvent(action) {
  const { eventId } = action;

  const { response, error } = yield sagaRequestWrapper(
    ticketActions.getTicketForEventRequest,
    api.ticket.getByEvent,
    {
      eventId
    }
  );
}

export function* buyTicketForEventSaga(action) {
  const { ticketId, eventId } = action;

  const { response, error } = yield sagaRequestWrapper(
    ticketActions.buyTicketForEventRequest,
    api.ticket.buyTicket,
    {
      ticketId
    }
  );

  if (response) {
    yield call(fetchTicketForEvent, { eventId });
  }
}

export function* cancelEventTicketSaga(action) {
  const { id, eventId } = action;

  const { response, error } = yield sagaRequestWrapper(
    ticketActions.cancelTicketForEventRequest,
    api.ticket.cancelTicket,
    {
      id,
      eventId
    }
  );
}

export function* approveEventTicketsSaga(action) {
  const { eventId, userTicketIds } = action;

  const { response, error } = yield sagaRequestWrapper(
    ticketActions.approveTicketsForEventRequest,
    api.ticket.approveTickets,
    {
      eventId,
      userTicketIds
    }
  );
}
export function* rejectEventTicketsSaga(action) {
  const { eventId, userTicketIds } = action;

  const { response, error } = yield sagaRequestWrapper(
    ticketActions.rejectTicketsForEventRequest,
    api.ticket.rejectTickets,
    {
      eventId,
      userTicketIds
    }
  );
}

export default function* root() {
  yield all([
    takeLatest(
      ticketActions.getTicketForEventRequest.START,
      fetchTicketForEvent
    ),
    takeEvery(
      ticketActions.buyTicketForEventRequest.START,
      buyTicketForEventSaga
    ),
    takeEvery(
      ticketActions.cancelTicketForEventRequest.START,
      cancelEventTicketSaga
    ),
    takeLatest(
      ticketActions.approveTicketsForEventRequest.START,
      approveEventTicketsSaga
    ),
    takeLatest(
      ticketActions.rejectTicketsForEventRequest.START,
      rejectEventTicketsSaga
    )
  ]);
}
