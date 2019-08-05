import { GET_BOOKMARKS, GET_BOOKMARKED_ERROR } from '../actions/types/article.type';

const initialState = {};
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_BOOKMARKS:
      return {
        ...state,
        list: payload,
      };
    case GET_BOOKMARKED_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
