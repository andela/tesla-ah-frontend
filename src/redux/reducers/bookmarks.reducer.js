import {
  GET_BOOKMARKS_PENDING,
  GET_BOOKMARKS,
  GET_BOOKMARKED_ERROR,
  DELETE_BOOKMARKS,
  DELETE_BOOKMARKS_ERROR,
} from '../actions/types/article.type';

const initialState = {
  list: [],
  error: '',
  message: '',
  loading: false,
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_BOOKMARKS_PENDING:
      return {
        ...state,
        ...payload,
        loading: true,
      };
    case GET_BOOKMARKS:
      return {
        ...state,
        list: payload,
        loading: false,
      };
    case GET_BOOKMARKED_ERROR:
      return {
        ...state,
        error: payload,
      };
    case DELETE_BOOKMARKS:
      return {
        ...state,
        message: payload.message,
        list: state.list.filter(article => article.slug !== payload.slug),
      };
    case DELETE_BOOKMARKS_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
