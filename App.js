/* @flow */
import React from 'react';
import type { Element } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-native';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import configureStore, { history } from './src/configureStore';
import Loading from './src/components/Loading';
import PrivateRoute from './src/components/PrivateRoute';
import Login from './src/components/Login';
import Home from './src/components/Home';

const { store, persistor } = configureStore();

const App = (): Element<*> => (
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exac path="/login" component={Login} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

export default App;
