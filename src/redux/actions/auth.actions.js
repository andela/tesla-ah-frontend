import axios from 'axios';
import { toast } from 'react-toastify';
import { setLoading, setLoaded } from './ui.actions';
import { BACKEND_URL } from '../../utils/constants';
import {
  VERIFIED,
  SIGNUP_SUCCESS,
  VERIFICATION_FAILED,
  LOG_OUT_SUCCESS,
  LOG_OUT,
} from './types/auth.type';

export const createAccount = userInfo => async (dispatch) => {
  dispatch(setLoading());
  try {
    // eslint-disable-next-line no-unused-vars
    const { data } = await axios.post(
      `${BACKEND_URL}/api/auth/signup`,
      userInfo,
    );
    dispatch(setLoaded());
    // eslint-disable-next-line no-undef
    sessionStorage.setItem('token', data.data.token);
    localStorage.user = JSON.stringify(data.data);
    toast.success('You are now registered to AH, check your email to verify your account');
    dispatch({
      type: SIGNUP_SUCCESS,
    });
  } catch (error) {
    dispatch(setLoaded());
    const { message } = error.response.data;
    toast.error(message);
  }
};

export const verifyAccount = token => async (dispatch) => {
  dispatch(setLoading());
  try {
    await axios.get(`${BACKEND_URL}/api/auth/verify/?token=${token}`);
    dispatch(setLoaded());
    dispatch({
      type: VERIFIED,
    });
  } catch (error) {
    toast.error('Invalid request');
    dispatch(setLoaded());
    dispatch({
      type: VERIFICATION_FAILED,
    });
  }
};

export const loggOut = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/api/auth/signout`, {
      headers: { token: sessionStorage.getItem('token') },
    });
    dispatch({
      type: LOG_OUT_SUCCESS,
      payload: { message: data.message },
    });
  } catch (error) {
    dispatch({
      type: LOG_OUT,
      payload: error,
    });
  }
};
