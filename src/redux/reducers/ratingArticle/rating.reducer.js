/* eslint-disable no-duplicate-case */
/* eslint-disable object-curly-newline */
import { RATING_FAIL, GET_RATING, CREATE_RATING, UPDATE_RATING } from '../../actions/types/rating.type';

const initialState = {
  rating: 0,
  userRated: false,
  errors: {},
};
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_RATING:
      return {
        ...state,
        userRated: true,
        rating: payload.data,
      };
    case UPDATE_RATING:
      return {
        ...state,
        userRated: true,
        rating: payload.data,
      };
    case GET_RATING:
      return {
        ...state,
        Ratings: payload.data,
      };
    case RATING_FAIL:
      return {
        ...state,
        errors: payload,
      };
    default:
      return state;
  }
};
