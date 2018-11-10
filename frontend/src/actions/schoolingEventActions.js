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
  GET_EVENT_PARTICIPANTS_REQUEST,
  LOAD_EVENT_CREATOR_INITIAL_VALUES,
  OPEN_CREATOR_DIALOG,
  CHANGE_SCHOOLING_EVENT_FOLLOW_REQUEST
} from '../constants/actionTypes';

//TODO: Rename all GET requestas as Fetch
const getMoreFeaturedSchoolingEvents = createAction(GET_MORE_SCHOOLING_EVENTS);
const openCreatorDialog = isOpen =>
  createAction(OPEN_CREATOR_DIALOG, { isOpen });

const getEventParticipantsRequest = createAsyncAction(
  GET_EVENT_PARTICIPANTS_REQUEST
);

const getFeaturedSchoolingEventsRequest = createAsyncAction(
  GET_FEATURED_SCHOOLING_EVENTS_REQUEST
);

const changeSchoolingEventFollow = createAsyncAction(
  CHANGE_SCHOOLING_EVENT_FOLLOW_REQUEST
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

const loadEventCreatorInitialValues = createAsyncAction(
  LOAD_EVENT_CREATOR_INITIAL_VALUES
);

export default {
  getFeaturedSchoolingEventsRequest,
  getEventRequest,
  getScheduleRequst,
  getEventAvailableTicketsRequest,
  getMoreFeaturedSchoolingEvents,
  getEventParticipantsRequest,
  changeSchoolingEventFollow,
  createOrUpdateSchoolingEvent,
  createSchoolingEventRequest,
  updateSchoolingEventRequest,
  loadEventCreatorInitialValues,
  openCreatorDialog
};
