/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { GET_BOOKMARKS, GET_BOOKMARKED_ERROR } from './types/article.type';
import { BASE_URL } from '../../utils/constants';

export const listBookmarkedArticle = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/bookmarks`, {
      headers: { token: localStorage.getItem('token') },
    });
    dispatch({
      type: GET_BOOKMARKS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_BOOKMARKED_ERROR,
      payload: error.response,
    });
  }
};
