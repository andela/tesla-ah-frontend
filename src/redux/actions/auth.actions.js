import axios from 'axios';
import { toast } from 'react-toastify';
import { setLoading, setLoaded } from './ui.actions';
import { BACKEND_URL } from '../../utils/constants';
import {
  VERIFIED,
  SIGNUP_SUCCESS,
  VERIFICATION_FAILED,
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
    localStorage.setItem('ACCESS_TOKEN', data.data.token);
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
