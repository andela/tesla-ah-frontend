import axios from 'axios';
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
  GET_FOLLOWERS,
  GET_FOLLOWERS_FAIL,
  GET_FOLLOWING,
  GET_FOLLOWING_FAIL,
  FOLLOW_USER_START,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAIL,
  PROFILE_INIT_START,
  SET_FOLLOWERS_UPDATABLE,
} from './types/profile.type';
import parseArticleArray from '../../utils/parseArticleArray';
import { API_URL } from '../../utils/constants';

const token = sessionStorage.getItem('token');

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

export const getCurrentUser = userToken => async (dispatch) => {
  try {
    dispatch(getCurrentUserStart());
    const { data } = await axios.get(`${API_URL}/user`, {
      headers: { token: userToken },
    });
    localStorage.setItem('user', JSON.stringify(data.user));
    dispatch(getCurrentUserSuccess(data.user));
  } catch (error) {
    dispatch(getCurrentUserFail(error));
  }
};

export const getFollowers = username => async (dispatch) => {
  try {
    const { data: followers } = await axios.get(`${API_URL}/profiles/${username}/followers`, {
      headers: { token },
    });
    dispatch({ type: GET_FOLLOWERS, payload: { ...followers } });
  } catch (error) {
    dispatch({ type: GET_FOLLOWERS_FAIL });
  }
};

export const getFollowing = username => async (dispatch) => {
  try {
    const { data: following } = await axios.get(`${API_URL}/profiles/${username}/following`, {
      headers: { token },
    });
    dispatch({ type: GET_FOLLOWING, payload: { ...following } });
  } catch (error) {
    dispatch({ type: GET_FOLLOWING_FAIL, payload: { error: `${error}` } });
  }
};

export const getProfile = username => (dispatch) => {
  axios.get(`${API_URL}/profiles/${username}`)
    .then((response) => {
      const { data: { profile } } = response;
      dispatch({ type: GET_PROFILE, payload: { profile } });
    })
    .catch((error) => {
      dispatch({ type: GET_PROFILE_FAIL, payload: { error } });
    });
};

export const getArticles = username => (dispatch) => {
  axios.get(`${API_URL}/articles?author=${username}`)
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

export const initProfile = username => (dispatch) => {
  dispatch({ type: PROFILE_INIT_START });
  Promise.all([
    dispatch(getProfile(username)),
    dispatch(getArticles(username)),
    dispatch(getFollowers(username)),
    dispatch(getFollowing(username)),
  ]);
};

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
    const { data } = await axios.put(`${API_URL}/user/${userId}`, profileToUpdate, {
      headers: {
        token,
      },
    });
    dispatch(updateProfileSuccess(data.user));
  } catch (error) {
    dispatch(updateProfileFail(error));
  }
};

export const setFollowersUpdatable = () => ({ type: SET_FOLLOWERS_UPDATABLE });

const selectPath = (username, usePath) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  if (usePath) {
    return username;
  }

  return currentUser.username;
};

export const followUser = (userToken, username, usePath, unfollow) => async (dispatch) => {
  const relevantUsername = selectPath(username, usePath);
  dispatch({ type: FOLLOW_USER_START });
  try {
    if (unfollow) {
      await axios.patch(`${API_URL}/profiles/${username}/unfollow`, {}, {
        headers: { token: userToken },
      });
    } else {
      await axios.patch(`${API_URL}/profiles/${username}/follow`, {}, {
        headers: { token: userToken },
      });
    }
    const { data: followers } = await axios.get(`${API_URL}/profiles/${relevantUsername}/followers`, {
      headers: { token },
    });
    const { data: following } = await axios.get(`${API_URL}/profiles/${relevantUsername}/following`, {
      headers: { token },
    });
    dispatch({ type: FOLLOW_USER_SUCCESS, payload: { ...followers, ...following } });
  } catch (error) {
    dispatch({ type: FOLLOW_USER_FAIL, payload: { error } });
  }
};
