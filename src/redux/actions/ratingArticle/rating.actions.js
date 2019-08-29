/* eslint-disable consistent-return */
/* eslint-disable object-curly-newline */
/* eslint-disable import/prefer-default-export */
import Axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL, HEADER_CONFIG } from '../../../utils/constants';
import { RATING_FAIL, GET_RATING, CREATE_RATING, UPDATE_RATING } from '../types/rating.type';

export const getRating = slug => async (dispatch) => {
  try {
    const result = await Axios.get(`${API_URL}/ratings/articles/${slug}`, HEADER_CONFIG);
    dispatch({
      type: GET_RATING,
      payload: result.data,
    });
  } catch (error) {
    dispatch({
      type: RATING_FAIL,
      payload: error.response,
    });
  }
};

export const createRating = (slug, rating) => async (dispatch) => {
  try {
    const data = {
      rating,
    };
    const headers = {
      'Content-Type': 'application/json',
      token: `${sessionStorage.getItem('token')}`,
    };
    const result = await Axios.post(`${API_URL}/articles/${slug}/rating`, data, { headers });
    const response = await Axios.get(`${API_URL}/ratings/articles/${slug}`, HEADER_CONFIG);
    toast.success('Your ratings has been recorded!');
    dispatch({
      type: CREATE_RATING,
      payload: result,
    });
    dispatch({
      type: GET_RATING,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: RATING_FAIL,
      payload: error.response,
    });
  }
};

export const updateRating = (slug, rating) => async (dispatch) => {
  const data = {
    rating,
  };
  const headers = {
    'Content-Type': 'application/json',
    token: `${sessionStorage.getItem('token')}`,
  };
  const result = await Axios.put(`${API_URL}/articles/${slug}/rating`, data, { headers });
  const response = await Axios.get(`${API_URL}/ratings/articles/${slug}`, HEADER_CONFIG);
  toast.success('Your ratings has been updated!');
  dispatch({
    type: UPDATE_RATING,
    payload: result,
  });
  dispatch({
    type: GET_RATING,
    payload: response.data,
  });
};
