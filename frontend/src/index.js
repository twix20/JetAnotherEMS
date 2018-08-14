import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/event/:id" component={EventPage} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>,

  document.getElementById('root')
);
