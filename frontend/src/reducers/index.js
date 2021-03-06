import auth from './auth';
import common from './common';
import schoolingEvent from './schoolingEvent';
import schoolingEventFilterReducer from './schoolingEventFilterReducer';
import schedule from './schedule';
import loadingReducer from './loadingReducer';
import userTicketsReducer from './userTicketsReducer';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { reducer as notificationsReducer } from 'reapop';

export default combineReducers({
  auth,
  common,
  schoolingEvent,
  schoolingEventFilter: schoolingEventFilterReducer,
  schedule,
  notifications: notificationsReducer(),
  userTickets: userTicketsReducer,
  form: reduxFormReducer,
  loading: loadingReducer,
  router: routerReducer
});
