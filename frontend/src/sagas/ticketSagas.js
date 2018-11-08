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
import { TicketStatus } from '../constants/enums';

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

export function* handleChangeTicketsSatusForEvent(action) {
  const { eventId, userTicketIds, newTicketStatus } = action;

  const { response, error } = yield sagaRequestWrapper(
    ticketActions.changeTicketsSatusForEventRequest,
    api.ticket.changeStatuses,
    {
      eventId,
      userTicketIds,
      newTicketStatus
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
      ticketActions.changeTicketsSatusForEventRequest.START,
      handleChangeTicketsSatusForEvent
    )
  ]);
}
