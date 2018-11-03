import { createAsyncAction, createAction } from './common';
import { createFormAction } from 'redux-form-saga';
import {
  GET_FEATURED_SCHOOLING_EVENTS_REQUEST,
  GET_SCHOOLING_EVENT_REQUEST,
  GET_SCHOOLING_EVENT_SCHEDULE_REQUEST,
  GET_MORE_SCHOOLING_EVENTS,
  CREATE_OR_UPDATE_SCHOOLING_EVENT,
  POST_CREATE_SCHOOLING_EVENT_REQUEST,
  PATCH_CREATE_SCHOOLING_EVENT_REQUEST,
  GET_EVENT_AVAILABLE_TICKETS_REQUEST,
  GET_EVENT_PARTICIPANTS_REQUEST
} from '../constants/actionTypes';

//TODO: Rename all GET requestas as Fetch
const getMoreFeaturedSchoolingEvents = createAction(GET_MORE_SCHOOLING_EVENTS);

const getEventParticipantsRequest = createAsyncAction(
  GET_EVENT_PARTICIPANTS_REQUEST
);

const getFeaturedSchoolingEventsRequest = createAsyncAction(
  GET_FEATURED_SCHOOLING_EVENTS_REQUEST
);

const getEventRequest = createAsyncAction(GET_SCHOOLING_EVENT_REQUEST);
const getEventAvailableTicketsRequest = createAsyncAction(
  GET_EVENT_AVAILABLE_TICKETS_REQUEST
);
const getScheduleRequst = createAsyncAction(
  GET_SCHOOLING_EVENT_SCHEDULE_REQUEST
);

const createOrUpdateSchoolingEvent = createFormAction(
  CREATE_OR_UPDATE_SCHOOLING_EVENT
);

const createSchoolingEventRequest = createAsyncAction(
  POST_CREATE_SCHOOLING_EVENT_REQUEST
);
const updateSchoolingEventRequest = createAsyncAction(
  PATCH_CREATE_SCHOOLING_EVENT_REQUEST
);

export default {
  getFeaturedSchoolingEventsRequest,
  getEventRequest,
  getScheduleRequst,
  getEventAvailableTicketsRequest,
  getMoreFeaturedSchoolingEvents,
  getEventParticipantsRequest,
  createOrUpdateSchoolingEvent,
  createSchoolingEventRequest,
  updateSchoolingEventRequest
};
