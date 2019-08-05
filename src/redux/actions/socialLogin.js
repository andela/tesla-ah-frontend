/* eslint-disable no-undef */
import socialLoginTesla from '../../utils/socialLoginTesla';
import { SUBMIT_LOGIN, ERROR_LOGIN } from './actionTypes.js/login';
import { SIGNUP_SUCCESS } from './actionTypes.js/signup';

/**
 * @returns {*} dispatch
 * @param {string} accessToken
 * @param {string} provider
 */

export const socialLogin = (accessToken, provider) => async (dispatch) => {
  try {
    const result = await socialLoginTesla.post(`${process.env.REACT_APP_BASE_URL}/api/auth/login/${provider}`, {
      access_token: accessToken,
    });
    const { user } = result.data;
    dispatch({
      type: SUBMIT_LOGIN,
      payload: user,
    });
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: user,
    });
  } catch (error) {
    const message = error.response ? error.response : 'No internet connection';
    dispatch({
      type: ERROR_LOGIN,
      payload: message,
    });
  }
};

/**
 * @returns {*} dispatch
 * @param {string} token
 * @param {string} username
 */
export const loginWithTwitter = (token, username) => (dispatch) => {
  const user = {
    token,
    username,
  };
  dispatch({
    type: SUBMIT_LOGIN,
    payload: user,
  });
};
export const loginWithGoogle = (token, username) => (dispatch) => {
  const user = {
    token,
    username,
  };
  dispatch({
    type: SUBMIT_LOGIN,
    payload: user,
  });
};
export const loginWithFacebook = (token, username) => (dispatch) => {
  const user = {
    token,
    username,
  };
  dispatch({
    type: SUBMIT_LOGIN,
    payload: user,
  });
};
