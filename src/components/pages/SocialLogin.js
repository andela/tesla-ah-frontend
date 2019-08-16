/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React, { Component } from 'react';
import { API_URL } from '../../utils/constants';

/**
 * @param {*} props
 * @returns {object}
 * Social login component
 */

export class SocialLogin extends Component {
  callTwitterLogin = () => {
    window.location.replace(`${API_URL}/api/auth/login/twitter`);
  };

  callGoogleLogin = () => {
    window.location.replace(`${API_URL}/api/auth/login/google`);
  };

  callFacebookLogin = () => {
    window.location.replace(`${API_URL}/api/auth/login/facebook`);
  }

  /**
   * @returns {*} dispatch
   */
  render() {
    return (
      <div className="social-btn-container">
        <div className="social-buttons">
          <a
            className="btn btn-fb btn btn-block button--facebook"
            href="javascript:void(0)"
            onClick={this.callFacebookLogin}
          >
            <i className="icon fab fa-facebook-f" />
            &nbsp;&nbsp;Sign in with Facebook
          </a>
          <a
            className="btn btn-tw btn-block button--twitter"
            href="javascript:void(0)"
            onClick={this.callTwitterLogin}
          >
            <i className="fab fa-twitter" />
            &nbsp;&nbsp;Sign in with Twitter
          </a>
          <a
            className="btn btn-danger btn-block button--googleplus"
            href="javascript:void(0)"
            onClick={this.callGoogleLogin}
          >
            <i className="fab fa-google" />
            &nbsp;&nbsp;Sign in with Google
          </a>
        </div>
      </div>
    );
  }
}

export default SocialLogin;
