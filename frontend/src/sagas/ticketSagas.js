import { all, call, put, takeLatest, select } from 'redux-saga/effects';
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
  console.log(response);
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

  console.log(response);
}

export default function* root() {
  yield all([
    takeLatest(
      ticketActions.getTicketForEventRequest.START,
      fetchTicketForEvent
    ),
    takeLatest(
      ticketActions.buyTicketForEventRequest.START,
      buyTicketForEventSaga
    )
  ]);
}
