/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../assets/scss/main.scss';
import Home from './pages/Home';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Header from './layouts/Header';
import Signup from './pages/Signup';
import Terms from './pages/Terms';
import VerifyAccount from './pages/VerifyAccount';

const App = () => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/signup" component={Signup} />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/verify/:token" component={VerifyAccount} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
};
export default App;
