import axios from 'axios';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../utils/constants';
import {
  OPTED_IN_EMAIL, OPTED_OUT_EMAIL, OPTED_IN_APP, OPTED_OUT_APP,
  ALREADY_OPTED_IN_APP, ALREADY_OPTED_IN_EMAIL,
} from './types/optInOptOut.type';

export const optInApp = () => async (dispatch) => {
  try {
    const token = sessionStorage.getItem('token');
    const { data } = await axios.post(`${BACKEND_URL}/api/user/optinapp`, {}, { headers: { token } });
    toast.success('You are now opted-in to in-app notifications');
    dispatch({
      type: OPTED_IN_APP,
      payload: data,
    });
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message);
  }
};
export const optedInApp = () => async (dispatch) => {
  const token = sessionStorage.getItem('token');
  const res = await axios.get(`${BACKEND_URL}/api/user/optinapp`, { headers: { token } });
  dispatch({
    type: ALREADY_OPTED_IN_APP,
    payload: res.data,
  });
};

export const optedInEmail = () => async (dispatch) => {
  const token = sessionStorage.getItem('token');
  const res = await axios.get(`${BACKEND_URL}/api/user/optinemail`, { headers: { token } });
  dispatch({
    type: ALREADY_OPTED_IN_EMAIL,
    payload: res.data,
  });
};

export const optOutApp = () => async (dispatch) => {
  try {
    const token = sessionStorage.getItem('token');
    const { data } = await axios.delete(`${BACKEND_URL}/api/user/optinapp`, {
      headers: {
        token,
      },
    });
    toast.success('You are now opted-out!');
    dispatch({
      type: OPTED_OUT_APP,
      payload: data,
    });
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message);
  }
};
export const optInEmail = () => async (dispatch) => {
  try {
    const token = sessionStorage.getItem('token');
    const { data } = await axios.post(`${BACKEND_URL}/api/user/optinemail`, {}, {
      headers: {
        token,
      },
    });
    toast.success('You are now opted-in for receiving email notifications');
    dispatch({
      type: OPTED_IN_EMAIL,
      payload: data,
    });
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message);
  }
};
export const optOutEmail = () => async (dispatch) => {
  try {
    const token = sessionStorage.getItem('token');
    const { data } = await axios.delete(`${BACKEND_URL}/api/user/optinemail`, {
      headers: {
        token,
      },
    });
    toast.success('You are now opted-out!');
    dispatch({
      type: OPTED_OUT_EMAIL,
      payload: data,
    });
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message);
  }
};
