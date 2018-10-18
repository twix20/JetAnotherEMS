import { createAsyncAction, createAction } from './common';
import {
  GET_FEATURED_SCHOOLING_EVENTS_REQUEST,
  GET_SCHOOLING_EVENT_REQUEST,
  GET_SCHOOLING_EVENT_SCHEDULE_REQUEST,
  GET_MORE_SCHOOLING_EVENTS
} from '../constants/actionTypes';

const getMoreFeaturedSchoolingEvents = createAction(GET_MORE_SCHOOLING_EVENTS);

const getFeaturedSchoolingEventsRequest = createAsyncAction(
  GET_FEATURED_SCHOOLING_EVENTS_REQUEST
);

const getEventRequest = createAsyncAction(GET_SCHOOLING_EVENT_REQUEST);
const getScheduleRequst = createAsyncAction(
  GET_SCHOOLING_EVENT_SCHEDULE_REQUEST
);

export default {
  getFeaturedSchoolingEventsRequest,
  getEventRequest,
  getScheduleRequst,
  getMoreFeaturedSchoolingEvents
};
