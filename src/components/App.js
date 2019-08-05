/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import {
  Route, BrowserRouter, Switch, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'moment-timezone';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/scss/main.scss';

import Header from './layouts/Header';
// import axios from 'axios';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Terms from './pages/Terms';
import VerifyAccount from './pages/VerifyAccount';
import Footer from './layouts/Footer';
import ReadArticle from './pages/ReadArticle';
import ResetPasswordRequest from './pages/ResetPasswordEmail';
import ApplyPassword from './pages/ApplyPasswordForm';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';
import Bookmarks from './pages/Bookmark';

// axios.defaults.headers.Authorization = localStorage.getItem('token');
const App = ({ loggedIn }) => (
  <BrowserRouter>
    <Header />
    <ToastContainer />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/auth/signup" component={Signup} />
      <Route exact path="/terms" component={Terms} />
      <Route exact path="/verify/:token" component={VerifyAccount} />
      <Route
        exact
        path="/bookmark"
        render={props => (loggedIn ? (
          <Bookmarks {...props} />
        ) : (
        // eslint-disable-next-line react/prop-types
          <Redirect to={`/auth/login?redirect=${props.location.pathname}`} />
        ))
        }
      />
      <Route exact path="/articles/:slug" component={ReadArticle} />
      <Route exact path="/resetPassword/:token" component={ApplyPassword} />
      <Route exact path="/resetPasswordRequest" component={ResetPasswordRequest} />
      <Route exact path="/profile/:username" component={Profile} />

      <Route exact path="/" component={Home} />
      <Route exact path="/verify/:token" component={VerifyAccount} />
      <Route component={PageNotFound} />
    </Switch>
    <Footer />
  </BrowserRouter>
);
const mapStateToProps = ({ auth: { loggedIn } }) => ({ loggedIn });
export default connect(mapStateToProps)(App);
