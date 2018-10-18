import { combineReducers } from 'redux';
import ActionTypes, {
  GET_FEATURED_SCHOOLING_EVENTS_REQUEST,
  GET_SCHOOLING_EVENT_REQUEST
} from '../constants/actionTypes';

import schoolingEventActions from '../actions/schoolingEventActions';

const featuredDefaultState = {
  byId: {}
};

const featured = (state = featuredDefaultState, action) => {
  switch (action.type) {
    case schoolingEventActions.getFeaturedSchoolingEventsRequest.types.success:
      return {
        byId: {
          ...action.response.data.data.reduce((acc, e) => {
            acc[e.id] = e;
            return acc;
          }, state.byId)
        }
      };
    default:
      return state;
  }
};

const eventsInitialState = { byId: {} };
const events = (state = eventsInitialState, action) => {
  switch (action.type) {
    case ActionTypes.ASYNC_SUCCESS:
      if (action.subtype === GET_SCHOOLING_EVENT_REQUEST) {
        const { id, event } = action;
        return {
          byId: {
            ...state.byId,
            [id]: {
              ...event,
              loading: false
            }
          }
        };
      }
    case ActionTypes.ASYNC_START:
      if (action.subtype === GET_SCHOOLING_EVENT_REQUEST) {
        const { id } = action;
        return {
          byId: {
            ...state.byId,
            [id]: {
              loading: true
            }
          }
        };
      }
    case ActionTypes.ASYNC_FAILURE:
      if (action.subtype === GET_SCHOOLING_EVENT_REQUEST) {
        const { id } = action;
        return {
          byId: {
            ...state.byId,
            [id]: {
              loading: false
            }
          }
        };
      }
    default:
      return state;
  }
};

export const selectors = {
  featured: state => Object.values(state.schoolingEvent.featured.byId) || []
};

export default combineReducers({
  featured,
  events
});
