import ActionTypes from '../constants/actionTypes';

export const createAction = (type, payload) => ({ type, ...payload });

export const createAsyncAction = actionType =>
  [
    { name: 'start', value: ActionTypes.ASYNC_START },
    { name: 'success', value: ActionTypes.ASYNC_SUCCESS },
    { name: 'failure', value: ActionTypes.ASYNC_FAILURE }
  ].reduce((acc, type) => {
    const fullType = `${actionType}_${type.value}`;

    acc[type.name] = data => createAction(fullType, data);
    acc[type.name.toUpperCase()] = fullType;
    acc.type = actionType;

    return acc;
  }, {});
