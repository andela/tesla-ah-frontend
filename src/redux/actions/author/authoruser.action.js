/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { GET_USER_PROFILE } from '../types/authorprofile.type';
import { BACKEND_URL } from '../../../utils/constants';

export const getUserProfile = username => async (dispatch) => {
  const { data } = await axios.get(`${BACKEND_URL}/api/profiles/${username}`);
  dispatch({
    type: GET_USER_PROFILE,
    payload: data,
  });
};
