import {
  LOGGED_IN, LOGGED_OUT, SIGNUP_SUCCESS, VERIFIED, VERIFICATION_FAILED,
} from '../actions/types/auth.type';

const initialState = {
  loggedIn: true,
  verified: false,
  signupSuccess: false,
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case LOGGED_IN:
      return {
        ...state,
        loggedIn: true,
      };
    case LOGGED_OUT:
      return {
        ...state,
        loggedIn: false,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupSuccess: true,
      };
    case VERIFIED:
      return {
        ...state,
        verified: true,
      };
    case VERIFICATION_FAILED:
      return {
        ...state,
        verifailed: true,
      };
    default:
      return state;
  }
};
