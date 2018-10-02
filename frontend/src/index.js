import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { store, history } from './store';
import App from './App';

//ConnectedRouter doesnt work with gh-pages
ReactDOM.render(
  <Provider store={store}>
    <HashRouter history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
