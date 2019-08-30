/* eslint-disable max-len */
/* eslint-disable default-case */
import {
  LIKE_ARTICLE_SUCCESS,
  LIKE_ARTICLE_FAILURE,
  DISLIKE_ARTICLE_SUCCESS,
  DISLIKE_ARTICLE_FAILURE,
  GET_ARTICLE_LIKES_SUCCESS,
  GET_ARTICLE_DISLIKES_SUCCESS,
} from '../actions/types/likeAndDislike.type';

const initialState = {
  likeArticle: {},
  dislikeArticle: {},
  getArticleLikes: {},
  getArticleDislikes: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LIKE_ARTICLE_SUCCESS:
      return {
        ...state,
        like_article: payload,
      };
    case LIKE_ARTICLE_FAILURE:
      return {
        ...state,
        like_article: payload,
      };
    case GET_ARTICLE_LIKES_SUCCESS:
      return {
        ...state,
        get_article_likes: {
          ...payload,
          loading: true,
          message: '',
          errors: {},
        },
      };
    case DISLIKE_ARTICLE_SUCCESS:
      return {
        ...state,
        dislike_article: payload,
      };
    case DISLIKE_ARTICLE_FAILURE:
      return {
        ...state,
        dislike_article: payload,
      };
    case GET_ARTICLE_DISLIKES_SUCCESS:
      return {
        ...state,
        get_article_dislikes: payload,
      };
    default:
      return state;
  }
};
