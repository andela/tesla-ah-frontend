import axios from '../../utils/axios-ah';

import {
  PROFILE_INIT_START,
  PROFILE_INIT_SUCCESS,
  PROFILE_INIT_FAIL,
  GET_CURRENT_USER_START,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAIL,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  SET_PROFILE_UPDATABLE,
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

export const initProfileStart = () => ({
  type: PROFILE_INIT_START,
});

export const initProfileSuccess = profile => ({
  type: PROFILE_INIT_SUCCESS,
  payload: profile,
});

export const initProfileFail = error => ({
  type: PROFILE_INIT_FAIL,
  payload: { error },
});

export const initProfile = username => async (dispatch) => {
  dispatch(initProfileStart());
  try {
    const {
      data: { profile: user },
    } = await axios.get(`/profiles/${username}`);
    const {
      data: { data: followers },
    } = await axios.get('/profiles/followers');
    const {
      data: { data: following },
    } = await axios.get('/profiles/following');
    const { data: articles } = await axios.get(`/articles?author=${username}`);
    const processedArticles = await parseArticleArray(articles.data);
    dispatch(
      initProfileSuccess({
        user,
        followers,
        following,
        articles: processedArticles,
      }),
    );
  } catch (error) {
    dispatch(initProfileFail(error));
  }
};

export const updateProfileStart = () => ({
  type: UPDATE_PROFILE_START,
});

export const updateProfileFail = () => ({
  type: UPDATE_PROFILE_FAIL,
});

export const updateProfileSucess = user => ({
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
    dispatch(updateProfileSucess(data.user));
  } catch (error) {
    dispatch(updateProfileFail(error));
  }
};
