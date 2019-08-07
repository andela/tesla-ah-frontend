// Articles reducers
import { GET_ARTICLES, CREATE_ARTICLE, GET_ARTICLE } from '../actions/types/article.type';

const initialState = {
  articles: [],
  currentArticle: {},
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
      return {
        ...state,
        article: payload,
      };
    case CREATE_ARTICLE:
      return {
        ...state,
        currentArticle: payload,
      };
    default:
      return state;
  }
};
