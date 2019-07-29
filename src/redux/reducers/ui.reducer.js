import { IS_LOADING, IS_LOADED } from '../actions/types/ui.type';

const initialState = {
  loading: false,
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case IS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case IS_LOADED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
