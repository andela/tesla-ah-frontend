/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/scss/main.scss';
import Home from './pages/Home';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Header from './layouts/Header';
import Signup from './pages/Signup';
import Terms from './pages/Terms';
import VerifyAccount from './pages/VerifyAccount';
import CreateArticle from './article/CreateArticle';
import AllArticles from './article/AllArticles';
import SingleArticle from './article/SingleArticle';


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
      <Route exact path="/create/article" component={CreateArticle} />
      <Route exact path="/articles" component={AllArticles} />
      <Route exact path="/articles/:slug" component={SingleArticle} />
      <Route component={PageNotFound} />
    </Switch>
    <ToastContainer autoClose={4000} />
  </BrowserRouter>
);
export default App;
