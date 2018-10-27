import { createAsyncAction, createAction } from './common';
import {
  GET_TICKET_FOR_EVENT_REQUEST,
  BUY_TICKET_FOR_EVENT_REQUEST
} from '../constants/actionTypes';

const getTicketForEventRequest = createAsyncAction(
  GET_TICKET_FOR_EVENT_REQUEST
);

const buyTicketForEventRequest = createAsyncAction(
  BUY_TICKET_FOR_EVENT_REQUEST
);

export default {
  getTicketForEventRequest,
  buyTicketForEventRequest
};
