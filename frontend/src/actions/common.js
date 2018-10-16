import ActionTypes from '../constants/actionTypes';

export const createAction = (type, payload) => ({ type, ...payload });

export const createActionTypes = actionType => ({
  start: payload =>
    createAction(ActionTypes.ASYNC_START, { subtype: actionType, ...payload }),
  success: data =>
    createAction(ActionTypes.ASYNC_SUCCESS, { subtype: actionType, ...data }),
  failure: error =>
    createAction(ActionTypes.ASYNC_FAILURE, { subtype: actionType, error })
});
