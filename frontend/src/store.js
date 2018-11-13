import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

import { localStorageMiddleware } from './middleware';
import reducer from './reducers';
import authActions from './actions/authActions';

import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import thunk from 'redux-thunk';
import { reducer as notificationsReducer } from 'reapop';

import { extractUserFromToken } from './services/authService';
import ability, { abilityForUser } from './config/ability';

export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

export const sagaMiddleware = createSagaMiddleware();

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(
      sagaMiddleware,
      myRouterMiddleware,
      localStorageMiddleware,
      thunk
    );
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware(
      sagaMiddleware,
      myRouterMiddleware,
      localStorageMiddleware,
      thunk,
      createLogger({
        diff: true
      })
    );
  }
};

export const store = createStore(reducer, composeWithDevTools(getMiddleware()));
// Load previous user token
const jwtToken = localStorage.getItem('jwt');

if (jwtToken && jwtToken != 'undefined') {
  const user = extractUserFromToken(jwtToken);

  const newAbility = abilityForUser(user);
  ability.update(newAbility.rules);

  store.dispatch(
    authActions.login.success({
      user
    })
  );
} else {
  const newAbility = abilityForUser(null);
  ability.update(newAbility.rules);
}

sagaMiddleware.run(rootSaga);
