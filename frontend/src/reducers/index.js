import auth from './auth';
import common from './common';
import schoolingEvent from './schoolingEvent';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  auth,
  common,
  schoolingEvent,
  router: routerReducer
});
