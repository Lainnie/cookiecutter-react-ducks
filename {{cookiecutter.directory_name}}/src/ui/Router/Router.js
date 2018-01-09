import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import App from '../App';
import Login from '../Login';

const isAuthenticated = () => !!localStorage.getItem('accessToken');

const Router = () => (
  <main>
    <Switch>
      <PrivateRoute exact path="/" component={App} />
      <Route path="/login" component={Login} />
    </Switch>
  </main>
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )}
  />
);

export default Router;
