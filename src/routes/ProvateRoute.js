import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated ? (
      <Component {...props} />
    ) : (
    // eslint-disable-next-line react/prop-types
      <Redirect to={`/auth/login?redirect=${props.location.pathname}`} />
    ))}
  />
);

const mapStateToProps = ({ login: { isAuthenticated } }) => ({ isAuthenticated });

export default connect(mapStateToProps)(PrivateRoute);
