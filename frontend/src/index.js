import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
/* eslint-disable */
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
// pick utils
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
// import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils";
// import LuxonUtils from "material-ui-pickers/utils/luxon-utils";

import { store, history } from './store';
import HomePage from './pages/Home';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
