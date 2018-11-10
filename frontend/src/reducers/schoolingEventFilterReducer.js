import ActionTypes from '../constants/actionTypes';
import { SchoolingEventSortType } from '../constants/enums';

const initialState = {
  sort: SchoolingEventSortType.None,
  tags: [],
  dateStart: null,
  dateEnd: null,
  priceFrom: null,
  priceTo: null,
  onlyFavorites: null,
  onlyPrivate: null,
  onlyMy: null
};

const schoolingEventFilter = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_SCHOOLING_EVENT_FILTER: {
      const { name, data } = action;

      return {
        ...state,
        [name]: data
      };
    }
    default:
      return state;
  }
};

export const selectors = {
  filter: state => state.schoolingEventFilter
};

export default schoolingEventFilter;
