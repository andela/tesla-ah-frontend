import axios from '../../utils/axios-ah';

import {
  GET_CURRENT_USER_START,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAIL,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  SET_PROFILE_UPDATABLE,
  GET_ARTICLE,
  GET_ARTICLE_FAIL,
  GET_PROFILE,
  GET_PROFILE_FAIL,
} from './types/profile.type';
import parseArticleArray from '../../utils/parseArticleArray';

export const getCurrentUserStart = () => ({
  type: GET_CURRENT_USER_START,
});

export const getCurrentUserSuccess = data => ({
  type: GET_CURRENT_USER_SUCCESS,
  payload: { currentUser: data },
});

export const getCurrentUserFail = error => ({
  type: GET_CURRENT_USER_FAIL,
  payload: { error },
});

export const getCurrentUser = () => async (dispatch) => {
  try {
    dispatch(getCurrentUserStart());
    const { data } = await axios.get('/user');
    dispatch(getCurrentUserSuccess(data.user));
  } catch (error) {
    dispatch(getCurrentUserFail(error));
  }
};

export const getProfile = username => (dispatch) => {
  axios.get(`/profiles/${username}`)
    .then((response) => {
      const { data: { profile } } = response;
      dispatch({ type: GET_PROFILE, payload: { profile } });
    })
    .catch((error) => {
      dispatch({ type: GET_PROFILE_FAIL, payload: { error } });
    });
};

export const getArticles = username => (dispatch) => {
  axios.get(`/articles?author=${username}`)
    .then((response) => {
      const { data: articles } = response;
      parseArticleArray(articles.data)
        .then((processed) => {
          dispatch({ type: GET_ARTICLE, payload: { articles: processed } });
        });
    })
    .catch((error) => {
      dispatch({ type: GET_ARTICLE_FAIL, payload: { error } });
    });
};

export const initProfile = username => dispatch => Promise.all([
  dispatch(getProfile(username)),
  dispatch(getArticles(username)),
]);

export const updateProfileStart = () => ({
  type: UPDATE_PROFILE_START,
});

export const updateProfileFail = () => ({
  type: UPDATE_PROFILE_FAIL,
});

export const updateProfileSuccess = user => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: { user },
});

export const setUpdatable = () => ({
  type: SET_PROFILE_UPDATABLE,
});

export const updateProfile = (userId, profileToUpdate) => async (dispatch) => {
  dispatch(updateProfileStart());
  try {
    const { data } = await axios.put(`/user/${userId}`, profileToUpdate);
    dispatch(updateProfileSuccess(data.user));
  } catch (error) {
    dispatch(updateProfileFail(error));
  }
};
