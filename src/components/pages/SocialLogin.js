/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React, { Component } from 'react';

/**
 * @param {*} props
 * @returns {object}
 * Social login component
 */

export class SocialLogin extends Component {
  callTwitterLogin = () => {
    window.location.replace(`${process.env.REACT_APP_BASE_URL}/api/auth/login/twitter`);
  };

  callGoogleLogin = () => {
    window.location.replace(`${process.env.REACT_APP_BASE_URL}/api/auth/login/google`);
  };

  callFacebookLogin = () => {
    window.location.replace(`${process.env.REACT_APP_BASE_URL}/api/auth/login/facebook`);
  }

  /**
   * @returns {*} dispatch
   */
  render() {
    return (
      <React.Fragment>
        <a
          className="social button--social-login button--facebook"
          href="javascript:void(0)"
          onClick={this.callFacebookLogin}
        >
          <i className="icon fa fa-facebook" />
          Facebook
        </a>
        <a
          className="social button--social-login button--twitter"
          href="javascript:void(0)"
          onClick={this.callTwitterLogin}
        >
          <i className="icon fa fa-twitter" />
                Twitter
        </a>
        <a
          className="social button--social-login button--googleplus"
          href="javascript:void(0)"
          onClick={this.callGoogleLogin}
        >
          <i className="icon fa fa-google-plus" />
                Google +
        </a>
      </React.Fragment>
    );
  }
}

export default SocialLogin;
