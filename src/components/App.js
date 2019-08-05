/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './layouts/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Terms from './pages/Terms';
import VerifyAccount from './pages/VerifyAccount';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';

import '../assets/scss/main.scss';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <BrowserRouter>
    <Header />
    <ToastContainer />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/auth/signup" component={Signup} />
      <Route exact path="/terms" component={Terms} />
      <Route exact path="/verify/:token" component={VerifyAccount} />
      <Route exact path="/profile/:username" component={Profile} />
      <Route component={PageNotFound} />
    </Switch>
  </BrowserRouter>
);
export default App;
