/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {
  GET_BOOKMARKS,
  GET_BOOKMARKED_ERROR,
  DELETE_BOOKMARKS,
  DELETE_BOOKMARKS_ERROR,
} from './types/article.type';
import { BACKEND_URL } from '../../utils/constants';

export const listBookmarkedArticle = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/bookmarks`, {
      headers: { token: sessionStorage.getItem('token') },
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
export const deleteBookmarkedArticle = slug => async (dispatch) => {
  try {
    const { data } = await axios.delete(`${BACKEND_URL}/api/bookmarks/${slug}`, {
      headers: { token: sessionStorage.getItem('token') },
    });
    dispatch({
      type: DELETE_BOOKMARKS,
      payload: { message: data.message, slug },
    });
  } catch (error) {
    dispatch({
      type: DELETE_BOOKMARKS_ERROR,
      payload: error.response ? error.response.data.error : error.message,
    });
  }
};
