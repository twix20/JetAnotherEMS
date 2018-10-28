import { combineReducers } from 'redux';
import ActionTypes, { LOGOUT } from '../constants/actionTypes';
import ticketActions from '../actions/ticketActions';

const byEventId = (state = {}, action) => {
  switch (action.type) {
    case ticketActions.getTicketForEventRequest.SUCCESS: {
      const { eventId } = action;

      return {
        ...state,
        [eventId]: action.response.data.data
      };
    }
    case ticketActions.cancelTicketForEventRequest.SUCCESS: {
      const { eventId } = action;

      delete state[eventId];

      return {
        ...state
      };
    }

    case LOGOUT: {
      return {};
    }
    default:
      return state;
  }
};

export const selectors = {
  forEvent: (state, eventId) => state.userTickets.byEventId[eventId] || null
};

export default combineReducers({ byEventId });
