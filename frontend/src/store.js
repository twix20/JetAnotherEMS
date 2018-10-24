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

export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

export const sagaMiddleware = createSagaMiddleware();

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(
      sagaMiddleware,
      myRouterMiddleware,
      localStorageMiddleware
    );
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware(
      sagaMiddleware,
      myRouterMiddleware,
      localStorageMiddleware,
      createLogger()
    );
  }
};

export const store = createStore(reducer, composeWithDevTools(getMiddleware()));
// Load previous user token
const jwtToken = localStorage.getItem('jwt');
console.log(jwtToken);
if (jwtToken) {
  store.dispatch(authActions.login(jwtToken, 'Bearer'));
}

sagaMiddleware.run(rootSaga);
