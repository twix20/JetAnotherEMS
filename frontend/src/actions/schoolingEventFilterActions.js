import { createAction } from './common';
import ActionTypes from '../constants/actionTypes';

export const updateFilter = (name, data) =>
  createAction(ActionTypes.UPDATE_SCHOOLING_EVENT_FILTER, { name, data });

export default {
  updateFilter
};
