import ActionTypes from '../constants/actionTypes';

const loadingReducer = (state = {}, action) => {
  const { type, ...rest } = action;

  const regex = new RegExp(
    `(.*)_(${ActionTypes.ASYNC_START}|${ActionTypes.ASYNC_SUCCESS}|${
      ActionTypes.ASYNC_FAILURE
    })`
  );

  const matches = regex.exec(type);

  // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
  if (!matches) return state;

  const [, actionName, actionState] = matches;
  return {
    ...state,
    // Store whether a request is happening at the moment or not
    // e.g. will be true when receiving GET_TODOS_REQUEST
    //      and false when receiving GET_TODOS_SUCCESS / GET_TODOS_FAILURE
    [actionName]: {
      loading: actionState === ActionTypes.ASYNC_START,
      ...rest
    }
  };
};

export default loadingReducer;
