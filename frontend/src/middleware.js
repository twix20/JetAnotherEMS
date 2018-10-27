import { LOGIN, LOGOUT, REGISTER } from './constants/actionTypes';
import authActions from './actions/authActions';

const localStorageMiddleware = store => next => action => {
  if (action.type === authActions.login.SUCCESS) {
    console.log('SUCCESSFULLY LOGGED IN');
    if (!action.error) {
      window.localStorage.setItem('jwt', action.payload.accessToken);
      //agent.setToken(action.payload.user.token);
    }
  } else if (action.type === LOGOUT) {
    window.localStorage.setItem('jwt', '');
    //agent.setToken(null);
  }

  next(action);
};

export { localStorageMiddleware };
