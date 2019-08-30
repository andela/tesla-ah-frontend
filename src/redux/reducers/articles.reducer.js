/* eslint-disable object-curly-newline */
import {
  GET_ARTICLES,
  GET_ONE_ARTICLES,
  CREATE_ARTICLE,
  UPLOAD_IMAGE,
  UPDATE_ARTICLE,
  RESET_PROPS,
  GET_MY_ARTICLES,
  ARTICLE_ERRORS,
  DELETE_ARTICLE,
  BOOKMARK,
  GET_BOOKMARK,
} from '../actions/types/article.type';

const initialState = {
  articles: [],
  currentArticle: {},
  uploadedImage: {},
  updatedArticle: {},
  myarticles: {},
  deletedArticle: {},
  error: {},
  Boomarks: [],
  boomark: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: payload,
      };
    case GET_MY_ARTICLES:
      return {
        ...state,
        myarticles: payload,
      };
    case GET_ONE_ARTICLES:
      return {
        ...state,
        article: payload,
      };
    case CREATE_ARTICLE:
      return {
        ...state,
        currentArticle: payload,
      };
    case UPLOAD_IMAGE:
      return {
        ...state,
        uploadedImage: payload,
      };
    case UPDATE_ARTICLE:
      return {
        ...state,
        updatedArticle: payload,
      };
    case DELETE_ARTICLE:
      return {
        ...state,
        deletedArticle: payload,
      };
    case ARTICLE_ERRORS:
      return {
        ...state,
        error: payload,
      };
    case GET_BOOKMARK:
      return {
        ...state,
        Boomarks: payload,
      };
    case BOOKMARK:
      return {
        ...state,
        bookmark: payload,
      };
    case RESET_PROPS:
      return {
        ...state,
        articles: [],
        currentArticle: {},
        uploadedImage: {},
        updatedArticle: {},
        myarticles: {},
        deletedArticle: {},
        error: {},
      };
    default:
      return state;
  }
};
