/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

import axios from 'axios';
import { toast } from 'react-toastify';
import jwt from 'jwt-decode';
import { BACKEND_URL } from '../../../utils/constants';
import * as userActionTypes from '../types/auth.type';

export const loginPending = () => ({
  type: userActionTypes.LOGIN_PENDING,
  payload: true,
});
export const loginSuccess = (token, user) => ({
  type: userActionTypes.LOGIN_SUCCESS,
  payload: { token, user },
});
export const loginError = error => ({
  type: userActionTypes.LOGIN_ERROR,
  payload: error,
});

export const login = (email, password) => async (dispatch) => {
  dispatch(loginPending());
  const loginData = {
    email,
    password,
  };
  try {
    const send = await axios.post(`${BACKEND_URL}/api/auth/login`, loginData);
    const { data } = send;
    const token = data.data.token;
    const user = jwt(token);
    sessionStorage.setItem('token', token);
    toast.success(`Thank you ${user.firstName}, you are now logged in successfully!`);
    dispatch(loginSuccess(token, user));
  } catch (error) {
    const message = (await error.response) ? error.response.data.error.message : 'something wrong';
    toast.error(message);
    dispatch(loginError(message));
  }
};
