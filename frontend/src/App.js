import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import BigCalendar from 'react-big-calendar-like-google';
import NotificationsSystem from 'reapop';
import moment from 'moment';

import DialogGDPR from './components/DialogGDPR';

import HomePage from './pages/Home';
import EventPage from './pages/Event';

import reapopTheme from 'reapop-theme-wybo';
import 'babel-polyfill';
import '!style-loader!css-loader!font-awesome/css/font-awesome.min.css';

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

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DialogGDPR />
          <NotificationsSystem theme={reapopTheme} />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/event/:id" component={EventPage} />
          </Switch>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
