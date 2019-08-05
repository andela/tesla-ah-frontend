import axios from 'axios';
import { PATCH_RESET } from './types/resetPassword.type';
import { setLoading, setLoaded } from './ui.actions';
import { BACKEND_URL } from '../../utils/constants';


/**
 * @returns {*} dispatch
 * @param {string} newpassword
 * @param {string} token
 */
const applyPassword = (newpassword, token) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await axios.patch(`${BACKEND_URL}/api/auth/reset/?token=${token}`, { newpassword });
    dispatch(setLoaded());
    dispatch({
      type: PATCH_RESET,
      payload: res.data,
    });
  } catch ({ response }) {
    dispatch(setLoaded());
    dispatch({
      type: PATCH_RESET,
      payload: response.data,
    });
  }
};
export default applyPassword;
