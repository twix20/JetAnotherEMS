import { combineReducers } from 'redux';
import ActionTypes, {
  GET_SCHOOLING_EVENT_REQUEST
} from '../constants/actionTypes';

import schoolingEventActions from '../actions/schoolingEventActions';

const featuredDefaultState = {
  byId: {}
};

const featured = (state = featuredDefaultState, action) => {
  switch (action.type) {
    case schoolingEventActions.getFeaturedSchoolingEventsRequest.SUCCESS:
      return {
        byId: {
          ...state.byId,

          ...action.response.data.data.reduce((acc, e) => {
            acc[e.id] = e;
            return acc;
          }, state.byId)
        }
      };
    case ActionTypes.UPDATE_SCHOOLING_EVENT_FILTER:
      return {
        byId: {}
      };
    default:
      return state;
  }
};

const availableTicketsDefaultState = {
  byEventId: {}
};
const availableTickets = (state = availableTicketsDefaultState, action) => {
  switch (action.type) {
    case schoolingEventActions.getEventAvailableTicketsRequest.SUCCESS: {
      const { id } = action;
      const availableTickets = action.response.data.data;

      return {
        byEventId: {
          ...state.byEventId,
          [id]: availableTickets
        }
      };
    }
    default:
      return state;
  }
};

const participantsDefaultState = {
  byEventId: {}
};
const participants = (state = participantsDefaultState, action) => {
  switch (action.type) {
    case schoolingEventActions.getEventParticipantsRequest.SUCCESS: {
      const { id } = action;
      const participants = action.response.data.data;

      return {
        byEventId: {
          ...state.byEventId,
          [id]: participants
        }
      };
    }
    default:
      return state;
  }
};

export const selectors = {
  featured: state => Object.values(state.schoolingEvent.featured.byId) || [],
  availableTickets: (state, eventId) =>
    state.schoolingEvent.availableTickets.byEventId[eventId] || [],
  participants: (state, eventId) =>
    state.schoolingEvent.participants.byEventId[eventId] || []
};

export default combineReducers({
  featured,
  availableTickets,
  participants
});
