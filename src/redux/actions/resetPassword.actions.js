import axios from 'axios';
import { POST_RESET } from './types/resetPassword.type';
import { setLoading, setLoaded } from './ui.actions';
import { BACKEND_URL } from '../../utils/constants';

/**
 * @returns {*} dispatch
 * @param {string} email
 */
const resetPassword = email => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await axios.post(`${BACKEND_URL}/api/auth/reset`, { email });
    dispatch(setLoaded());
    dispatch({
      type: POST_RESET,
      payload: res.data,
    });
  } catch ({ response }) {
    dispatch(setLoaded());
    dispatch({
      type: POST_RESET,
      payload: response.data,
    });
  }
};
export default resetPassword;
