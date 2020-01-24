// @flow
import React from 'react';
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import history from './history';
import Home from './pages/Home';


const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default Routes;
