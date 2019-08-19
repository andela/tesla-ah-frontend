import axios from 'axios';
// import { toast } from 'react-toastify';
import * as types from '../types/article.type';
import { BACKEND_URL } from '../../../utils/constants';

export default (queryText, type) => async (dispatch) => {
  dispatch({
    type: types.SEARCH_CLEAR,
  });
  dispatch({
    type: types.SEARCH_PENDING,
  });
  try {
    const { data: response } = await axios.get(`${BACKEND_URL}/api/articles/?${type}=${queryText}`);
    dispatch({
      type: types.SEARCH_DONE,
      payload: response.data,
    });
  } catch ({ response: { data } }) {
    dispatch({
      type: types.SEARCH_FAILED,
      payload: data.error,
    });
  }
};
