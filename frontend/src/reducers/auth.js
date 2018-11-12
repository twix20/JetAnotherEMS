import jwtDecode from 'jwt-decode';

import { LOGIN, LOGOUT } from '../constants/actionTypes';

import authActions from '../actions/authActions';

const initialState = {
  token: null,
  email: null,
  userId: null,
  roles: []
};

export default (state = {}, action) => {
  switch (action.type) {
    case authActions.login.SUCCESS: {
      const { user } = action.payload;

      return {
        ...user
      };
    }
    case LOGOUT:
      return initialState;
    default:
      return state;
  }

  return state;
};

export const selectors = {
  getUser: state =>
    state.auth.token
      ? {
          token: state.auth.token,
          email: state.auth.email,
          roles: state.auth.roles
        }
      : null
};
