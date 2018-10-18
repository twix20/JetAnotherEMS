import { combineReducers } from 'redux';
import ActionTypes from '../constants/actionTypes';

const price = (state = { from: 0, to: 100 }, action) => {
  if (
    action.type === ActionTypes.UPDATE_SCHOOLING_EVENT_FILTER &&
    action.name === 'price'
  ) {
    return {
      from: action.from,
      to: action.to
    };
  }

  return state;
};

const date = (state = { from: null, to: null }, action) => {
  if (
    action.type === ActionTypes.UPDATE_SCHOOLING_EVENT_FILTER &&
    action.name === 'date'
  ) {
    return {
      from: action.from,
      to: action.to
    };
  }

  return state;
};

const toggleable = (
  state = { onlyFavorites: null, onlyOngoing: null },
  action
) => {
  if (
    action.type === ActionTypes.UPDATE_SCHOOLING_EVENT_FILTER &&
    action.name === 'toggleable'
  ) {
    const { toggleableName, value } = action;

    return {
      ...state,
      [toggleableName]: value
    };
  }

  return state;
};

export const selectors = {
  filter: state => state.schoolingEventFilter
};

export default combineReducers({ price, date, toggleable });
