import axios from 'axios';
// import axioz from '../../utils/axios-ah';
import {
  UPLOAD_IMAGE,
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
  GET_ARTICLES,
  GET_ONE_ARTICLES,
  RESET_PROPS,
  DELETE_ARTICLE,
  GET_MY_ARTICLES,
} from './types/article.type';
import {
  STORAGE_BASE_URL,
  IMAGE_STORAGE_PRESENTS,
  API_URL,
  HEADER_CONFIG,
} from '../../utils/constants';

export const createArticle = article => async (dispatch) => {
  const { data } = await axios.post(
    `${API_URL}/articles`,
    article,
    HEADER_CONFIG,
  );
  dispatch({
    type: CREATE_ARTICLE,
    payload: data,
  });
};
export const updateArticle = (article, slug) => async (dispatch) => {
  const { data } = await axios.put(
    `${API_URL}/articles/${slug}`,
    article,
    HEADER_CONFIG,
  );
  dispatch({
    type: UPDATE_ARTICLE,
    payload: data,
  });
};
export const uploadImage = e => async (dispatch) => {
  const baseUrl = `${STORAGE_BASE_URL}`;
  const basePreset = `${IMAGE_STORAGE_PRESENTS}`;
  const imageFile = e;
  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('upload_preset', basePreset);
  const { data } = await axios.post(baseUrl, formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  dispatch({
    type: UPLOAD_IMAGE,
    payload: data,
  });
};

export const getArticle = slug => async (dispatch) => {
  const { data } = await axios.get(`${API_URL}/articles/${slug}`);
  dispatch({
    type: GET_ONE_ARTICLES,
    payload: data,
  });
};

export const getArticles = page => async (dispatch) => {
  const { data } = await axios.get(`${API_URL}/articles?page=${page}&limit=10`);
  dispatch({
    type: GET_ARTICLES,
    payload: { articles: data.data.foundArticles, count: data.data.count },
  });
};

export const resetProps = () => ({ type: RESET_PROPS });

export const deleteArticle = slug => async (dispatch) => {
  const res = await axios.delete(`${API_URL}/articles/${slug}`, HEADER_CONFIG);
  dispatch({
    type: DELETE_ARTICLE,
    payload: res.data,
  });
};

export const getMyArticles = page => async (dispatch) => {
  const res = await axios.get(
    `${API_URL}/articles/user?page=${page}&limit=5`,
    HEADER_CONFIG,
  );
  dispatch({
    type: GET_MY_ARTICLES,
    payload: res.data,
  });
};
