import ActionTypes, {
  GET_SCHOOLING_EVENT_SCHEDULE_REQUEST
} from '../constants/actionTypes';

import schoolingEventActions from '../actions/schoolingEventActions';

import { combineReducers } from 'redux';

const initialState = {};

const bySchoolingEventId = (state = initialState, action) => {
  switch (action.type) {
    case schoolingEventActions.getScheduleRequst.types.success:
      const { id } = action;

      return {
        ...state,
        [id]: {
          ...action.response.data.data
        }
      };
    default:
      return state;
  }
};

export const selectors = {
  forSchoolingEvent: (state, id) => state.schedule.bySchoolingEventId[id]
};

export default combineReducers({ bySchoolingEventId });
