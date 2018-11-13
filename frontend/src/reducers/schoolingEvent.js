import { combineReducers } from 'redux';
import ActionTypes, { OPEN_CREATOR_DIALOG } from '../constants/actionTypes';

import schoolingEventActions from '../actions/schoolingEventActions';

import { SchoolingEvent } from './../models/index';

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
    case schoolingEventActions.changeSchoolingEventFollow.SUCCESS: {
      const { eventId, newFollowStatus } = action;

      if (!state.byId[eventId]) return state;

      return {
        byId: {
          ...state.byId,
          [eventId]: {
            ...state.byId[eventId],
            isFollowing: newFollowStatus
          }
        }
      };
    }
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

const byId = (state = {}, action) => {
  switch (action.type) {
    case schoolingEventActions.getEventRequest.SUCCESS: {
      const { id } = action;

      return {
        ...state,
        [id]: action.response.data.data
      };
    }
    case schoolingEventActions.changeSchoolingEventFollow.SUCCESS: {
      const { eventId, newFollowStatus } = action;

      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          isFollowing: newFollowStatus
        }
      };
    }
    default:
      return state;
  }
};

const creatorDialog = (state = { isOpen: false }, action) => {
  switch (action.type) {
    case OPEN_CREATOR_DIALOG: {
      return {
        isOpen: action.isOpen
      };
    }
    default:
      return state;
  }
};

export const selectors = {
  eventById: (state, id) => state.schoolingEvent.byId[id],
  events: state => Object.values(state.schoolingEvent.byId),
  featured: state => Object.values(state.schoolingEvent.featured.byId) || [],
  availableTickets: (state, eventId) =>
    state.schoolingEvent.availableTickets.byEventId[eventId] || [],
  participants: (state, eventId) =>
    state.schoolingEvent.participants.byEventId[eventId] || [],
  isCreatorOpened: state => state.schoolingEvent.creatorDialog.isOpen
};

export default combineReducers({
  byId,
  featured,
  availableTickets,
  participants,
  creatorDialog
});
