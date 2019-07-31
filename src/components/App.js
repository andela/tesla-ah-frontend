import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import PageNotFound from './PageNotFound';
import '../assets/scss/main.scss';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route component={PageNotFound} />
    </Switch>

  </BrowserRouter>
);

export default App;
