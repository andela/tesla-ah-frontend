/* eslint-disable object-curly-newline */
// Articles reducers
import { GET_ARTICLES, GET_ARTICLE, CREATE_ARTICLE, DELETE_ARTICLE, ARTICLE_ERRORS } from '../actions/types/article.type';

const initialState = {
  articles: [],
  currentArticle: {},
  errors: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: payload,
      };
    case GET_ARTICLE:
      return payload;
    case CREATE_ARTICLE:
      return {
        ...state,
        currentArticle: payload,
      };
    case DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter(article => article.id !== action.payload),
      };
    case ARTICLE_ERRORS:
      return {
        ...state,
        errors: payload,
      };
    default:
      return state;
  }
};
