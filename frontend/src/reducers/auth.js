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
      const { accessToken } = action.payload;

      const decoded = jwtDecode(accessToken);
      console.log(decoded);

      return {
        token: accessToken,
        userId: decoded['sub'],
        email:
          decoded[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
          ],
        roles: [
          decoded[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ]
        ]
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
