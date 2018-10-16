import { createActionTypes } from './common';
import { GET_FEATURED_SCHOOLING_EVENTS_REQUEST } from '../constants/actionTypes';

const getFeaturedSchoolingEventsRequest = createActionTypes(
  GET_FEATURED_SCHOOLING_EVENTS_REQUEST
);

export default {
  getFeaturedSchoolingEventsRequest
};
