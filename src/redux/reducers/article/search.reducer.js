import * as types from '../../actions/types/article.type';

const initialState = {
  results: [],
  failed: false,
  pending: false,
  cleared: true,
  message: '',
  done: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SEARCH_DONE:
      return {
        ...state,
        results: payload,
        cleared: false,
        pending: false,
        done: true,
        message: '',
        failed: false,
      };
    case types.SEARCH_CLEAR:
      return initialState;
    case types.SEARCH_FAILED:
      return {
        ...state,
        pending: false,
        failed: true,
        message: payload,
      };
    case types.SEARCH_PENDING:
      return {
        ...state,
        pending: true,
      };
    default:
      return state;
  }
};
