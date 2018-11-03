import { createAsyncAction, createAction } from './common';
import {
  GET_TICKET_FOR_EVENT_REQUEST,
  BUY_TICKET_FOR_EVENT_REQUEST,
  CANCEL_TICKET_FOR_EVENT_REQUEST,
  APPROVE_TICKETS_FOR_EVENT_REQUEST,
  REJECT_TICKETS_FOR_EVENT_REQUEST
} from '../constants/actionTypes';

const getTicketForEventRequest = createAsyncAction(
  GET_TICKET_FOR_EVENT_REQUEST
);

const buyTicketForEventRequest = createAsyncAction(
  BUY_TICKET_FOR_EVENT_REQUEST
);

const cancelTicketForEventRequest = createAsyncAction(
  CANCEL_TICKET_FOR_EVENT_REQUEST
);

const approveTicketsForEventRequest = createAsyncAction(
  APPROVE_TICKETS_FOR_EVENT_REQUEST
);
const rejectTicketsForEventRequest = createAsyncAction(
  REJECT_TICKETS_FOR_EVENT_REQUEST
);

export default {
  getTicketForEventRequest,
  buyTicketForEventRequest,
  cancelTicketForEventRequest,
  approveTicketsForEventRequest,
  rejectTicketsForEventRequest
};
