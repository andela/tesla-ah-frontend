// Articles reducers
import { GET_USER_PROFILE } from '../actions/types/authorprofile.type';

const initialState = {
  authorprofile: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        authorprofile: payload,
      };
    default:
      return state;
  }
};
