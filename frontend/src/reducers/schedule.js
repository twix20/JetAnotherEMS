import ActionTypes, {
  GET_SCHOOLING_EVENT_SCHEDULE_REQUEST
} from '../constants/actionTypes';

import { combineReducers } from 'redux';

const initialState = {};

const bySchoolingEventId = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ASYNC_SUCCESS:
      if (action.subtype === GET_SCHOOLING_EVENT_SCHEDULE_REQUEST) {
        const { id } = action;

        return {
          ...state,
          [id]: {
            schedule: action.response.data.data,
            loading: false
          }
        };
      }
    case ActionTypes.ASYNC_START:
      if (action.subtype === GET_SCHOOLING_EVENT_SCHEDULE_REQUEST) {
        const { id } = action;

        return {
          ...state,
          [id]: {
            loading: true
          }
        };
      }
    case ActionTypes.ASYNC_FAILURE:
      if (action.subtype === GET_SCHOOLING_EVENT_SCHEDULE_REQUEST) {
        const { id } = action;

        return {
          ...state,
          [id]: {
            ...state[id],
            loading: false
          }
        };
      }
    default:
      return state;
  }
};

export const selectors = {
  forSchoolingEvent: (state, id) => state.schedule.bySchoolingEventId[id]
};

export default combineReducers({ bySchoolingEventId });
