/* eslint-disable object-curly-newline */
import {
  GET_ARTICLES,
  GET_ONE_ARTICLE,
  CREATE_ARTICLE,
  UPLOAD_IMAGE,
  UPDATE_ARTICLE,
  RESET_PROPS,
  GET_MY_ARTICLES,
  ARTICLE_ERRORS,
  DELETE_ARTICLE,
  BOOKMARK,
  GET_BOOKMARK,
  COMMENT_ON_ARTICLE,
  GET_COMMENTS,
  REPLY_COMMENT,
  DELETE_COMMENT,
  GET_COMMENT_LIKES,
  GET_COMMENT_DISLIKES,
  DISLIKE_COMMENT,
  LIKE_COMMENT,
  EDIT_COMMENT,
  GET_COMMENT_EDIT_HISTORY,
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
  currentComment: {},
  currentReplyComment: {},
  currentDeletedComment: {},
  currentLikedComment: {},
  commentLikes: {},
  commentDislikes: {},
  currentDisLikedComment: {},
  currentEditedComment: {},
  currentCommentEditHistory: {},
  comments: [],
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
    case GET_ONE_ARTICLE:
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
    case COMMENT_ON_ARTICLE:
      return {
        ...state,
        currentComment: payload,
      };
    case GET_COMMENTS:
      return {
        ...state,
        comments: payload,
      };
    case REPLY_COMMENT:
      return {
        ...state,
        currentReplyComment: payload,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        currentDeletedComment: payload,
      };
    case GET_COMMENT_LIKES:
      return {
        ...state,
        commentLikes: payload,
      };
    case GET_COMMENT_DISLIKES:
      return {
        ...state,
        commentDislikes: payload,
      };
    case LIKE_COMMENT:
      return {
        ...state,
        currentLikedComment: payload,
      };
    case DISLIKE_COMMENT:
      return {
        ...state,
        currentDisLikedComment: payload,
      };
    case EDIT_COMMENT:
      return {
        ...state,
        currentEditedComment: payload,
      };
    case GET_COMMENT_EDIT_HISTORY:
      return {
        ...state,
        currentCommentEditHistory: payload,
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
