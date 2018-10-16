import { combineReducers } from 'redux';
import ActionTypes, {
  GET_FEATURED_SCHOOLING_EVENTS_REQUEST
} from '../constants/actionTypes';

const featureddefaultState = {
  byId: {},
  all: [],
  loading: false
};

const featured = (state = featureddefaultState, action) => {
  switch (action.type) {
    case ActionTypes.ASYNC_SUCCESS:
      if (action.subtype === GET_FEATURED_SCHOOLING_EVENTS_REQUEST) {
        return {
          byId: {
            ...action.data.data.reduce((acc, e) => {
              acc[e.id] = e;
              return acc;
            }, state.byId)
          },
          all: state.all.concat(action.data.data),
          loading: false
        };
      }
    case ActionTypes.ASYNC_START:
      if (action.subtype === GET_FEATURED_SCHOOLING_EVENTS_REQUEST) {
        return {
          ...state,
          loading: true
        };
      }
    case ActionTypes.ASYNC_FAILURE:
      if (action.subtype === GET_FEATURED_SCHOOLING_EVENTS_REQUEST) {
        return {
          ...state,
          loading: false
        };
      }
    default:
      return state;
  }
};

export default combineReducers({
  featured
});
