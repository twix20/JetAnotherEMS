import { createActionTypes } from './common';
import {
  GET_FEATURED_SCHOOLING_EVENTS_REQUEST,
  GET_SCHOOLING_EVENT_REQUEST,
  GET_SCHOOLING_EVENT_SCHEDULE_REQUEST
} from '../constants/actionTypes';

const getFeaturedSchoolingEventsRequest = createActionTypes(
  GET_FEATURED_SCHOOLING_EVENTS_REQUEST
);

const getEventRequest = createActionTypes(GET_SCHOOLING_EVENT_REQUEST);
const getScheduleRequst = createActionTypes(
  GET_SCHOOLING_EVENT_SCHEDULE_REQUEST
);

export default {
  getFeaturedSchoolingEventsRequest,
  getEventRequest,
  getScheduleRequst
};
