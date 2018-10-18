import ActionTypes from '../constants/actionTypes';

export const createAction = (type, payload) => ({ type, ...payload });

export const createAsyncAction = actionType =>
  [
    { name: 'start', value: ActionTypes.ASYNC_START },
    { name: 'success', value: ActionTypes.ASYNC_SUCCESS },
    { name: 'failure', value: ActionTypes.ASYNC_FAILURE }
  ].reduce((acc, type) => {
    acc.types = acc.types || {};

    const fullType = `${actionType}_${type.value}`;
    acc[type.name] = data => createAction(fullType, data);
    acc.types[type.name] = fullType;
    acc.type = actionType;

    return acc;
  }, {});

// export const createActionTypes = actionType => ({
//   start: payload =>
//     createAction(ActionTypes.ASYNC_START, { subtype: actionType, ...payload }),
//   success: data =>
//     createAction(ActionTypes.ASYNC_SUCCESS, { subtype: actionType, ...data }),
//   failure: error =>
//     createAction(ActionTypes.ASYNC_FAILURE, { subtype: actionType, error })
// });
