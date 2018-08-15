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
import EventPage from './pages/Event';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#455A64'
    },
    secondary: {
      main: '#0044ff'
    },

    background: {
      default: '#eeeeee'
    }
  }
});

console.log(theme);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/event/:id" component={EventPage} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    </MuiPickersUtilsProvider>
  </MuiThemeProvider>,

  document.getElementById('root')
);
