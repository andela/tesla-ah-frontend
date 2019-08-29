import axios from 'axios';
import {
  UPLOAD_IMAGE,
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
  GET_ARTICLES,
  GET_ONE_ARTICLE,
  RESET_PROPS,
  DELETE_ARTICLE,
  GET_MY_ARTICLES,
  BOOKMARK,
  BOOKMARK_ERROR,
  GET_BOOKMARK,
  COMMENT_ON_ARTICLE,
  GET_COMMENTS,
  REPLY_COMMENT,
  DELETE_COMMENT,
  GET_COMMENT_LIKES,
  GET_COMMENT_DISLIKES,
  LIKE_COMMENT,
  DISLIKE_COMMENT,
  EDIT_COMMENT,
  GET_COMMENT_EDIT_HISTORY,
} from './types/article.type';
import {
  STORAGE_BASE_URL,
  IMAGE_STORAGE_PRESENTS,
  API_URL,
  HEADER_CONFIG,
  BACKEND_URL,
} from '../../utils/constants';
import {
  LIKE_ARTICLE_SUCCESS,
  DISLIKE_ARTICLE_SUCCESS,
  GET_ARTICLE_LIKES_SUCCESS,
  GET_ARTICLE_DISLIKES_SUCCESS,
} from './types/likeAndDislike.type';

export const createArticle = article => async (dispatch) => {
  const { data } = await axios.post(`${API_URL}/articles`, article, {
    headers: {
      'Content-Type': 'application/json',
      token: `${sessionStorage.getItem('token')}`,
    },
  });
  dispatch({
    type: CREATE_ARTICLE,
    payload: data,
  });
};
export const updateArticle = (article, slug) => async (dispatch) => {
  const { data } = await axios.put(`${API_URL}/articles/${slug}`, article, {
    headers: {
      'Content-Type': 'application/json',
      token: `${sessionStorage.getItem('token')}`,
    },
  });
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
    type: GET_ONE_ARTICLE,
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

export const getBoomarks = () => async (dispatch) => {
  const { data } = await axios.get(`${BACKEND_URL}/api/bookmarks`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      token: sessionStorage.getItem('token'),
    },
  });
  dispatch({
    type: GET_BOOKMARK,
    payload: data.data,
  });
};

export const bookmark = slug => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${BACKEND_URL}/api/articles/${slug}/bookmark`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          token: sessionStorage.getItem('token'),
        },
      },
    );
    dispatch({
      type: BOOKMARK,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOOKMARK_ERROR,
      payload: error.response.data,
    });
  }
};
export const likeArticle = slug => async (dispatch) => {
  const token = sessionStorage.getItem('token');
  try {
    const { data } = await axios.post(
      `${BACKEND_URL}/api/articles/${slug}/like`,
      {},
      {
        headers: {
          token,
        },
      },
    );
    dispatch({
      type: LIKE_ARTICLE_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: LIKE_ARTICLE_SUCCESS,
      payload: error.response,
    });
    return error.response;
  }
};

export const dislikeArticle = slug => async (dispatch) => {
  try {
    const token = sessionStorage.getItem('token');
    const { data } = await axios.post(
      `${BACKEND_URL}/api/articles/${slug}/dislike`,
      {},
      {
        headers: {
          token,
        },
      },
    );
    dispatch({
      type: DISLIKE_ARTICLE_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: DISLIKE_ARTICLE_SUCCESS,
      payload: error.response,
    });
    return error.response;
  }
};
export const getArticleLikes = slug => async (dispatch) => {
  const { data } = await axios.get(`${BACKEND_URL}/api/articles/${slug}/like`);
  dispatch({
    type: GET_ARTICLE_LIKES_SUCCESS,
    payload: data.data,
  });
  return data.data;
};
export const getArticleDislikes = slug => async (dispatch) => {
  const { data } = await axios.get(`${BACKEND_URL}/api/articles/${slug}/dislike`);
  dispatch({
    type: GET_ARTICLE_DISLIKES_SUCCESS,
    payload: data.data,
  });
  return data.data;
};

export const getMyArticles = page => async (dispatch) => {
  const res = await axios.get(`${API_URL}/articles/user?page=${page}&limit=5`, {
    headers: {
      'Content-Type': 'application/json',
      token: `${sessionStorage.getItem('token')}`,
    },
  });
  dispatch({
    type: GET_MY_ARTICLES,
    payload: res.data,
  });
};
export const makecomment = (slug, comment) => async (dispatch) => {
  try {
    const data = await axios.post(
      `${API_URL}/articles/${slug}/comments`,
      { comment },
      {
        headers: {
          'Content-Type': 'application/json',
          token: `${sessionStorage.getItem('token')}`,
        },
      },
    );
    dispatch({
      type: COMMENT_ON_ARTICLE,
      payload: data.data,
    });
    return data;
  } catch (err) {
    dispatch({
      type: COMMENT_ON_ARTICLE,
      payload: err.response.data,
    });
    return err.response;
  }
};
export const editcomment = (commentId, comment) => async (dispatch) => {
  try {
    const data = await axios.patch(
      `${API_URL}/articles/comments/${commentId}`,
      { comment },
      {
        headers: {
          'Content-Type': 'application/json',
          token: `${sessionStorage.getItem('token')}`,
        },
      },
    );
    dispatch({
      type: EDIT_COMMENT,
      payload: data.data,
    });
    return data;
  } catch (err) {
    dispatch({
      type: EDIT_COMMENT,
      payload: err.response.data,
    });
    return err.response;
  }
};
export const replyOnComment = (slug, commentId, comment) => async (dispatch) => {
  try {
    const data = await axios.post(
      `${API_URL}/articles/${slug}/comments/${commentId}`,
      { comment },
      {
        headers: {
          'Content-Type': 'application/json',
          token: `${sessionStorage.getItem('token')}`,
        },
      },
    );
    dispatch({
      type: REPLY_COMMENT,
      payload: data.data,
    });
    return data;
  } catch (err) {
    dispatch({
      type: REPLY_COMMENT,
      payload: err.response.data,
    });
    return err.response;
  }
};
export const getComments = slug => async (dispatch) => {
  const { data } = await axios.get(`${API_URL}/articles/${slug}/comments`);
  dispatch({
    type: GET_COMMENTS,
    payload: data.data,
  });
  return data;
};
export const deleteComment = commentId => async (dispatch) => {
  try {
    const data = await axios.delete(
      `${API_URL}/articles/comments/${commentId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          token: `${sessionStorage.getItem('token')}`,
        },
      },
    );
    dispatch({
      type: DELETE_COMMENT,
      payload: data.data,
    });
    return data;
  } catch (err) {
    dispatch({
      type: DELETE_COMMENT,
      payload: err.response.data,
    });
    return err.response.data;
  }
};
export const getCommentLikes = commentId => async (dispatch) => {
  const { data } = await axios.get(`${API_URL}/articles/comments/${commentId}/likes`);
  dispatch({
    type: GET_COMMENT_LIKES,
    payload: data.data,
  });
  return data.data;
};
export const getCommentDislikes = commentId => async (dispatch) => {
  const { data } = await axios.get(`${API_URL}/articles/comments/${commentId}/dislikes`);
  dispatch({
    type: GET_COMMENT_DISLIKES,
    payload: data.data,
  });
  return data.data;
};
export const likeComment = commentId => async (dispatch) => {
  try {
    const data = await axios.post(
      `${API_URL}/articles/comments/${commentId}/like`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          token: `${sessionStorage.getItem('token')}`,
        },
      },
    );
    dispatch({
      type: LIKE_COMMENT,
      payload: data.data,
    });
    return data;
  } catch (err) {
    dispatch({
      type: LIKE_COMMENT,
      payload: err.response.data,
    });
    return err.response;
  }
};
export const dislikeComment = commentId => async (dispatch) => {
  try {
    const data = await axios.post(
      `${API_URL}/articles/comments/${commentId}/dislike`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          token: `${sessionStorage.getItem('token')}`,
        },
      },
    );
    dispatch({
      type: DISLIKE_COMMENT,
      payload: data.data,
    });
    return data;
  } catch (err) {
    dispatch({
      type: DISLIKE_COMMENT,
      payload: err.response,
    });
    return err.response;
  }
};
export const getCommentEditHistory = commentId => async (dispatch) => {
  try {
    const data = await axios.get(
      `${API_URL}/articles/comments/${commentId}/history`,
      {
        headers: {
          'Content-Type': 'application/json',
          token: `${sessionStorage.getItem('token')}`,
        },
      },
    );
    dispatch({
      type: GET_COMMENT_EDIT_HISTORY,
      payload: data.data,
    });
    return data;
  } catch (err) {
    dispatch({
      type: GET_COMMENT_EDIT_HISTORY,
      payload: err.response,
    });
    return err.response;
  }
};
