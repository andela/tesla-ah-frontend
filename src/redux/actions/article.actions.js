/* eslint-disable consistent-return */
import Axios from 'axios';
import {
  GET_ARTICLES,
  GET_ARTICLE,
  ARTICLE_ERRORS,
} from './types/article.type';
import { BACKEND_URL } from '../../utils/constants';

export const getArticles = () => (dispatch) => {
  Axios.get(`${BACKEND_URL}/api/articles`)
    .then((res) => {
      dispatch({
        type: GET_ARTICLES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ARTICLE_ERRORS,
        payload: err,
      });
    });
};

export const getOneArticle = slug => (dispatch) => {
  Axios.get(`${BACKEND_URL}/api/articles/${slug}`)
    .then((res) => {
      dispatch({
        type: GET_ARTICLE,
        payload: res.data.article,
      });
    })
    .catch((err) => {
      dispatch({
        type: ARTICLE_ERRORS,
        payload: err,
      });
    });
};
