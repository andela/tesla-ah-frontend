/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { GET_ARTICLES, GET_ARTICLE } from './types/article.type';
import { BACKEND_URL } from '../../utils/constants';

export const getArticles = page => async (dispatch) => {
  const { data } = await axios.get(`${BACKEND_URL}/api/articles?page=${page}&limit=10`);
  dispatch({
    type: GET_ARTICLES,
    payload: { articles: data.data.foundArticles, count: data.data.count },
  });
};
export const getArticle = slug => async (dispatch) => {
  const { data } = await axios.get(`${BACKEND_URL}/api/articles/${slug}`);
  dispatch({
    type: GET_ARTICLE,
    payload: data,
  });
};
