/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'moment-timezone';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/scss/main.scss';
import Home from './pages/Home';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Header from './layouts/Header';
import Signup from './pages/Signup';
import Terms from './pages/Terms';
import VerifyAccount from './pages/VerifyAccount';
import Footer from './layouts/Footer';
import ReadArticle from './pages/ReadArticle';
import ResetPasswordRequest from './pages/ResetPasswordEmail';
import ApplyPassword from './pages/ApplyPasswordForm';

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
      <Route exact path="/articles/:slug" component={ReadArticle} />
      <Route exact path="/" component={Home} />
      <Route exact path="/verify/:token" component={VerifyAccount} />
      <Route exact path="/resetPassword/:token" component={ApplyPassword} />
      <Route exact path="/resetPasswordRequest" component={ResetPasswordRequest} />
      <Route component={PageNotFound} />
    </Switch>
    <Footer />
  </BrowserRouter>
);

export default App;
